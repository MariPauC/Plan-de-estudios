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

router.get('/semestresProg/:idPrograma', (req, res) => {
        try{
                const idPrograma = req.params.idPrograma;
                pool.query('SELECT pro_semestres FROM programa where idPrograma=(?)', [idPrograma], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        if (results.length > 0) {
                                const numSemestres = results[0];
                                res.send(numSemestres); // Enviar el nombre directamente como respuesta
                                console.log('Login successful');
                        }
                });
        }
        catch{
                console.error('Error identificando programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el programa' });
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
                pool.query('UPDATE programa SET pro_nombre=?, pro_SNIES=?, pro_modalidad=?, pro_jornada=?, pro_regAcreditacion=?, pro_fechaReg=?, pro_altaCalidad=?, pro_fechaCalidad=?, pro_semestres=? WHERE idPrograma = ?;',
                [valuesProgram.nombreP, valuesProgram.codigoP, valuesProgram.modalidadP, valuesProgram.jornadaP, valuesProgram.regisCal, valuesProgram.regisfecha, valuesProgram.acreditacion, valuesProgram.acreditafecha, valuesProgram.semestresP, idPrograma], (err) => {
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

router.get('/planesEstudios/:idPrograma/:estado', (req, res) => {
        const idPrograma = req.params.idPrograma;
        const estado = req.params.estado;
        try{
                pool.query('SELECT idPlanEstudios, pln_estado, pln_fechaCreacion, pln_fechaCambio, usu_nombre, usu_apellido FROM planestudios INNER JOIN usuario ON idUsuario = usuCambio_id WHERE pro_id = ? and pln_estado LIKE ?', 
                [idPrograma, `%${estado}%`], (err, results) => {
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

router.post('/crearPlan/:idPrograma', async (req, res) => { 
        const idPrograma = req.params.idPrograma;
        const { idUsuario } = req.body;
        var fechaActual = new Date();
        try {
                pool.query( 'INSERT INTO planestudios (pro_id, pln_estado, pln_fechaCreacion, usuCambio_id) VALUES (?,?,?,?)',
                [ idPrograma, "En desarrollo", fechaActual, idUsuario ],
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

router.put('/modificarPlan/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        const { idUsuario, estado } = req.body;
        var fechaActual = new Date();
        if(estado){
                if(idUsuario){
                        try {
                                pool.query('UPDATE planestudios SET pln_estado=?, pln_fechaCambio = ?, usuCambio_id=? WHERE idPlanEstudios = ?;',
                                [estado, fechaActual, idUsuario, idPlan], (err) => {
                                if (err) {
                                        console.error('Error al actualizar la materia:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la materia' });
                                } else {
                                        res.json({ message: 'Materia actualizada correctamente' });
                                }
                        });
                        } catch (error) {
                                console.error('Error al actualizar el programa:', error);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                        }
                }
                else{
                        try {
                                pool.query('UPDATE planestudios SET pln_estado=?, pln_fechaCambio = ? WHERE idPlanEstudios = ?;',
                                [estado, fechaActual, idPlan], (err) => {
                                if (err) {
                                        console.error('Error al actualizar la materia:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la materia' });
                                } else {
                                        res.json({ message: 'Materia actualizada correctamente' });
                                }
                        });
                        } catch (error) {
                                console.error('Error al actualizar el programa:', error);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                        }
                }
        }
        else{
                try {
                        pool.query('UPDATE planestudios SET pln_fechaCambio = ?, usuCambio_id=? WHERE idPlanEstudios = ?;',
                        [fechaActual, idUsuario, idPlan], (err) => {
                        if (err) {
                                console.error('Error al actualizar la materia:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar la materia' });
                        } else {
                                res.json({ message: 'Materia actualizada correctamente' });
                        }
                });
                        
                } catch (error) {
                        console.error('Error al actualizar el programa:', error);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                }
        }

        
});

router.get('/listaComentarios/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{
                pool.query('SELECT a.idComentario, a.com_detalle, a.com_fecha, b.usu_nombre, b.usu_apellido FROM comentario a INNER JOIN usuario b ON b.idUsuario = a.id_usuario WHERE id_Plan = ?', [idPlan], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de comentarios' });
        }
});

router.post('/comentar/:idPlan', async (req, res) => { 
        const idPlan = req.params.idPlan;
        const { valueComment, idUsuario } = req.body;
        var fechaActual = new Date();
        console.log("comentario:"+valueComment+"/n usurioid: "+idUsuario)
        try {
                pool.query( 'INSERT INTO comentario (com_fecha, com_detalle, id_usuario, id_plan) VALUES (?,?,?,?)',
                [ fechaActual, valueComment, idUsuario, idPlan ],
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

router.get('/listaAreas', (req, res) => {
        try{
                pool.query('SELECT idArea, are_nombre FROM areaconocimiento', (err, results) => {
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

router.get('/listaMaterias/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{
                pool.query('SELECT a.idMateria, a.mat_nombre, a.mat_codigo, a.mat_semestre , a.mat_horas, a.mat_creditos, b.are_iniciales, b.are_color FROM materia a INNER JOIN areaconocimiento b ON  b.idArea = a.area_id WHERE a.plan_id = ?',[idPlan],(err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando el listado de materias:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de materias' });
        }
});

router.get('/materia/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{
                pool.query('SELECT * FROM materia WHERE idMateria = ?',[idPlan],(err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                        console.log(results);
                });
        }
        catch{
                console.error('Error identificando el listado de materias:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de materias' });
        }
});

router.put('/materia/:idMateria', (req, res) => {
        const idMateria = req.params.idMateria;
        const { valuesMateria } = req.body;

        try {
                pool.query('UPDATE materia SET mat_nombre=?, mat_codigo=?, mat_semestre=?, mat_horas=?, mat_creditos=?, mat_descripcion=?, mat_tipo=?, area_id=? WHERE idMateria = ?;',
                [valuesMateria.nombre, valuesMateria.codigo, valuesMateria.semestre, valuesMateria.horas, valuesMateria.creditos, valuesMateria.descripcion, valuesMateria.tipo, valuesMateria.area, idMateria], (err) => {
                if (err) {
                        console.error('Error al actualizar la materia:', err);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la materia' });
                } else {
                        res.json({ message: 'Materia actualizada correctamente' });
                }
        });
                
        } catch (error) {
                console.error('Error al actualizar el programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
        }
});

router.post('/materia/:idPlan', async (req, res) => { //Falta modificar
        const idPlan = req.params.idPlan;
        const { valuesMateria } = req.body;
        try {
                pool.query( 'INSERT INTO  materia (mat_nombre, mat_codigo, mat_semestre, mat_horas, mat_creditos, mat_descripcion, mat_tipo, plan_id, area_id) VALUES (?,?,?,?,?,?,?,?,?)',
                [valuesMateria.nombre, valuesMateria.codigo, valuesMateria.semestre, valuesMateria.horas, valuesMateria.creditos, valuesMateria.descripcion, valuesMateria.tipo, idPlan, valuesMateria.area],
                async (err, results) => {
                        if (err) {
                        console.error('Error registering materia:', err);
                        return res.status(500).json({ error: 'Error registering materia' });
                        }

                        const idMateria = results.idMateria;
                        console.log(idMateria);
                        console.log('Materia registrada');
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Materia registrada exitosamente' });
                });
        } catch (error) {
                console.error('Error registering materia:', error);
                res.status(500).json({ error: 'An error occurred while registering materia' });
        }
});

router.delete('/materia/:idMateria', async (req, res) => {
        const idMateria = req.params.idMateria;
        try {
                pool.query( 'DELETE FROM materia WHERE idMateria = ?', [idMateria], async (err, results) => {
                        if (err) {
                        console.error('Error deleting materia:', err);
                        return res.status(500).json({ error: 'Error deleting materia' });
                        }
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Materia eliminada exitosamente' });
                });
        } catch (error) {
                console.error('Error al eliminar relaciones:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al eliminar las relaciones' });
        }
});


module.exports = router;