const express = require('express');
const router = express.Router();
const pool = require('../database/database')
const upload = require('../database/storage');
const fs = require('fs');
const { log } = require('console');

router.get('/sample', (req, res) => {
        res.json({ message: 'Sample API route is working!' });
});

router.get('/usuario/:idUsuario', (req, res) => {
        try{
                const idUsuario = req.params.idUsuario;
                pool.query('SELECT * FROM usuario where idUsuario=(?)', [idUsuario], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando usuario:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el usuario' });
        }
});

router.put('/usuario/:idUsuario', upload.single('archivoFirma'), (req, res) => {
        const idUsuario = req.params.idUsuario;
        const { nombre, apellido, documento, archivoActual } = req.body;
        try {
                console.log(archivoActual);
                if (req.file) {
                        const archivoNuevo = req.file.filename; 
                        console.log(req.file.filename)
                        const sql = 'UPDATE usuario SET usu_nombre = ?, usu_apellido = ?, usu_documento = ?, usu_firma = ? WHERE idUsuario = ?';
                        pool.query(sql, [nombre, apellido, documento, archivoNuevo, idUsuario], (err, result) => {
                        if (err) {
                                console.error('Error al actualizar el usuario:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
                        } else {
                                res.json({ message: 'Usuario actualizado correctamente con imagen' });
                                if(archivoActual){
                                        fs.unlinkSync("./uploads/"+archivoActual);
                                }
                                console.log("Guarddado con imagen");
                        }
                        });
                } else {
                        const sql = 'UPDATE usuario SET usu_nombre = ?, usu_apellido = ?, usu_documento = ? WHERE idUsuario = ?';
                        pool.query(sql, [nombre, apellido, documento, idUsuario], (err, result) => {
                        if (err) {
                                console.error('Error al actualizar el usuario:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
                        } else {
                                res.json({ message: 'Usuario actualizado correctamente (sin imagen)' });
                                console.log("Guardado sin imagen");
                        }
                        });
                }
        } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
        }
});

module.exports = router;


router.get('/dataPrograma/:idPrograma', (req, res) => {
        try{
                const { idPrograma } = req.params.idPrograma;
                pool.query('SELECT * FROM programa where idPrograma=(?)', [idPrograma],(err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el programa' });
        }
        
});

module.exports = router;