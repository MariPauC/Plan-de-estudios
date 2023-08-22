const express = require('express');
const pool = require('../database/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro
router.post('/registro', async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;
        const hashedContrasena = await bcrypt.hash(contrasena, 10);
        pool.query( 'INSERT INTO usuario (usu_correo, usu_contrasena, usu_nombre, usu_apellido) VALUES (?,?,?,?)',
            [correo, hashedContrasena, nombre, apellido],
            async (err) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).json({ error: 'Error registering user' });
                }
                console.log('Usuario registrado');
                // Envía una respuesta de éxito al cliente
                res.status(200).json({ message: 'Usuario registrado exitosamente' });
            }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        
        pool.query('SELECT * FROM usuario WHERE usu_correo = ?', [correo], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error retrieving data from the database' });
            }
            if (results.length > 0) {
              // Compara la contraseña ingresada con la almacenada
                if (await bcrypt.compare(contrasena, results[0].usu_contrasena)) {
                    // Genera un token con el id del usuario
                    const token = jwt.sign({ idUsuario: results[0].idUsuario }, 'your_secret_key', { expiresIn: '1h' });
                    res.json({ usuario: { id: results[0].idUsuario, rol: results[0].usu_rol}, token });
                    console.log('Login successful');
                } else {
                    return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
                }
            } else {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Ha ocurrido un error en el ingreso' });
    }
});


//Autenticacion
router.get('/autenticacion', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extraer el token del encabezado
        jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            }
            const usuarioId = decodedToken.idUsuario; // Ajusta esto según cómo hayas estructurado tu token
            pool.query('SELECT idUsuario, usu_rol FROM usuario WHERE idUsuario = ?', [usuarioId], async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                const usuario = results[0];
                res.json({ usuario });
            });
        });
    } catch (error) {
        return res.status(401).json({ error: 'Token no proporcionado o inválido' });
    }
});

module.exports = router;
