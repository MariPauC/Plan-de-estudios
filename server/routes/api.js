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

router.get('/listaProgramas', (req, res) => {
        try{
                pool.query('SELECT idPrograma, pro_nombre FROM programa', (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de programas' });
        }
});

router.get('/programa/:idPrograma', (req, res) => {
        try{
                const idPrograma = req.params.idPrograma;
                pool.query('SELECT * FROM programa where idPrograma=(?)', [idPrograma], (err, results) => {
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

router.put('/programa/:idPrograma', (req, res) => {
        const idPrograma = req.params.idPrograma;
        const { valuesProgram } = req.body;
        if(!valuesProgram.regisfecha){
                valuesProgram.regisfecha=null;
        }
        if(!valuesProgram.acreditafecha){
                valuesProgram.acreditafecha=null;
        }
        try {
                pool.query('UPDATE programa SET pro_nombre=?, pro_SNIES=?, pro_modalidad=?, pro_jornada=?, pro_regAcreditacion=?, pro_fechaReg=?, pro_altaCalidad=?, pro_fechaCalidad=? WHERE idPrograma = ?;',
                [valuesProgram.nombreP, valuesProgram.codigoP, valuesProgram.modalidadP, valuesProgram.jornadaP, valuesProgram.regisCal, valuesProgram.regisfecha, valuesProgram.acreditacion, valuesProgram.acreditafecha, idPrograma], (err) => {
                if (err) {
                        console.error('Error al actualizar el programa:', err);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                } else {
                        res.json({ message: 'Programa actualizado correctamente' });
                }
        });
                
        } catch (error) {
                console.error('Error al actualizar el programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
        }
});

router.post('/programa', async (req, res) => { //Falta modificar
        const { valuesProgram } = req.body;
        try {
                if(!valuesProgram.regisfecha){
                        valuesProgram.regisfecha=null;
                }
                if(!valuesProgram.acreditafecha){
                        valuesProgram.acreditafecha=null;
                }
                pool.query( 'INSERT INTO programa (pro_nombre, pro_SNIES, pro_modalidad, pro_jornada, pro_regAcreditacion, pro_fechaReg, pro_altaCalidad, pro_fechaCalidad) VALUES (?,?,?,?,?,?,?,?)',
                [valuesProgram.nombreP, valuesProgram.codigoP, valuesProgram.modalidadP, valuesProgram.jornadaP, valuesProgram.regisCal, valuesProgram.regisfecha, valuesProgram.acreditacion, valuesProgram.acreditafecha],
                async (err) => {
                        if (err) {
                        console.error('Error registering program:', err);
                        return res.status(500).json({ error: 'Error registering program' });
                        }
                        console.log('Programa registrado');
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Programa registrado exitosamente' });
                });
        } catch (error) {
                console.error('Error registering program:', error);
                res.status(500).json({ error: 'An error occurred while registering program' });
        }
});

router.get('/usuNombre/:idUsuario', (req, res) => {
        try {
                const idUsuario = req.params.idUsuario;
                pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [idUsuario], async (err, results) => {
                        if (err) {
                        return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        if (results.length > 0) {
                        const nombreUsuario = results[0].usu_nombre + " " + results[0].usu_apellido;
                        res.send(nombreUsuario); // Enviar el nombre directamente como respuesta
                        console.log('Login successful');
                        }
                });
                } catch (error) {
                console.error('Error identificando usuario:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el usuario' });
        }
});

router.get('/planesEstudios/:idPrograma/:estado', (req, res) => {
        const idPrograma = req.params.idPrograma;
        const estado = req.params.estado;
        try{
                pool.query('SELECT * FROM planestudios WHERE pro_id = ? and pln_estado LIKE ?', [idPrograma, `%${estado}%`], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de programas' });
        }
});

router.post('/planesEstudios/:idPrograma', async (req, res) => { 
        const idPrograma = req.params.idPrograma;
        const { nombreUsuario } = req.body;
        console.log("nombre:"+nombreUsuario);
        var fechaActual = new Date();
        try {
                pool.query( 'INSERT INTO planestudios (pro_id, pln_estado, pln_fechaCreacion, pln_usuCambio) VALUES (?,?,?,?)',
                [ idPrograma, "En desarrollo", fechaActual, nombreUsuario ],
                async (err) => {
                        if (err) {
                        console.error('Error registering plan:', err);
                        return res.status(500).json({ error: 'Error registering plan' });
                        }
                        console.log('Plan de estudios registrado');
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Plan de estudios registrado exitosamente' });
                });
        } catch (error) {
                console.error('Error registering plan:', error);
                res.status(500).json({ error: 'An error occurred while registering plan' });
        }
});

module.exports = router;