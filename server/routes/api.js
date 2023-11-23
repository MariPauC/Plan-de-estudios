const express = require('express');
const router = express.Router();
const pool = require('../database/database')
const upload = require('../database/storage');
const fs = require('fs');
const { log } = require('console');

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
        const { nombre, apellido, documento, archivoActual, rol } = req.body;
        try {
                if (req.file) {
                        const archivoNuevo = req.file.filename; 
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
                        }
                        });
                } else {
                        if(rol){
                                const sql = 'UPDATE usuario SET usu_nombre = ?, usu_apellido = ?, usu_documento = ?, usu_rol = ? WHERE idUsuario = ?';
                                pool.query(sql, [nombre, apellido, documento, rol, idUsuario], (err, result) => {
                                if (err) {
                                        console.error('Error al actualizar el usuario:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
                                } else {
                                        res.json({ message: 'Usuario actualizado correctamente (sin imagen)' });
                                }
                                });
                        }
                        else{
                                const sql = 'UPDATE usuario SET usu_nombre = ?, usu_apellido = ?, usu_documento = ? WHERE idUsuario = ?';
                                pool.query(sql, [nombre, apellido, documento, idUsuario], (err, result) => {
                                if (err) {
                                        console.error('Error al actualizar el usuario:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
                                } else {
                                        res.json({ message: 'Usuario actualizado correctamente (sin imagen)' });
                                }
                                });
                        }
                }
        } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el usuario' });
        }
});

router.delete('/usuario/:idUsuario', (req, res) => {
        try{
                const idUsuario = req.params.idUsuario;
                pool.query('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario], async (err, results) => {
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

router.get('/semestresProg/:idPrograma', (req, res) => {
        try{
                const idPrograma = req.params.idPrograma;
                pool.query('SELECT pro_semestres FROM programa where idPrograma =(?)', [idPrograma], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        if (results.length > 0) {
                                const numSemestres = results[0];
                                res.send(numSemestres);
                        }
                });
        }
        catch{
                console.error('Error identificando num del semestre:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el num del semestre' });
        }
});

router.get('/semestresPlan/:idPlan', (req, res) => {
        try{
                const idPlan = req.params.idPlan;
                pool.query('SELECT pln_semestres FROM planestudios where idPlanEstudios =(?)', [idPlan], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        if (results.length > 0) {
                                const numSemestres = results[0];
                                res.send(numSemestres); // Enviar el nombre directamente como respuesta
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

        if (!valuesProgram.regisfecha) {
                valuesProgram.regisfecha = null;
        }
        if (!valuesProgram.acreditafecha) {
                valuesProgram.acreditafecha = null;
        }

        pool.query(
                'SELECT idPlanEstudios FROM planestudios WHERE pro_id = ? AND pln_estado = "En desarrollo" LIMIT 1',
                [idPrograma],
                (err, results) => {
                if (err) {
                        console.error('Error al consultar el plan de estudios en desarrollo:', err);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                        return;
                }

                if (results.length > 0) {
                        const planEnDesarrolloId = results[0].idPlanEstudios;

                        pool.query(
                        'UPDATE planestudios SET pln_semestres = ? WHERE idPlanEstudios = ?;',
                        [valuesProgram.semestresP, planEnDesarrolloId],
                        (err) => {
                                if (err) {
                                console.error('Error al actualizar el plan de estudios en desarrollo:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                                } else {
                                
                                pool.query(
                                        'UPDATE programa SET pro_nombre=?, pro_SNIES=?, pro_modalidad=?, pro_jornada=?, pro_regAcreditacion=?, pro_fechaReg=?, pro_altaCalidad=?, pro_fechaCalidad=?, pro_semestres=? WHERE idPrograma = ?;',
                                        [
                                        valuesProgram.nombreP,
                                        valuesProgram.codigoP,
                                        valuesProgram.modalidadP,
                                        valuesProgram.jornadaP,
                                        valuesProgram.regisCal,
                                        valuesProgram.regisfecha,
                                        valuesProgram.acreditacion,
                                        valuesProgram.acreditafecha,
                                        valuesProgram.semestresP, 
                                        idPrograma,
                                        ],
                                        (err) => {
                                                if (err) {
                                                console.error('Error al actualizar el programa:', err);
                                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                                                } else {
                                                res.json({ message: 'Programa actualizado correctamente' });
                                                }
                                        }
                                );
                        }
                });
                } else {
                        pool.query(
                        'UPDATE programa SET pro_nombre=?, pro_SNIES=?, pro_modalidad=?, pro_jornada=?, pro_regAcreditacion=?, pro_fechaReg=?, pro_altaCalidad=?, pro_fechaCalidad=?, pro_semestres=? WHERE idPrograma = ?;',
                        [
                                valuesProgram.nombreP,
                                valuesProgram.codigoP,
                                valuesProgram.modalidadP,
                                valuesProgram.jornadaP,
                                valuesProgram.regisCal,
                                valuesProgram.regisfecha,
                                valuesProgram.acreditacion,
                                valuesProgram.acreditafecha,
                                valuesProgram.semestresP,
                                idPrograma,
                        ],
                        (err) => {
                                if (err) {
                                console.error('Error al actualizar el programa:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el programa' });
                                } else {
                                res.json({ message: 'Programa actualizado correctamente' });
                                }
                        });
                }
        });
});  

router.post('/programa', async (req, res) => {
        const { valuesProgram } = req.body;
        try {
                if(!valuesProgram.regisfecha){
                        valuesProgram.regisfecha=null;
                }
                if(!valuesProgram.acreditafecha){
                        valuesProgram.acreditafecha=null;
                }
                pool.query(
                        'INSERT INTO programa (pro_nombre, pro_SNIES, pro_modalidad, pro_jornada, pro_semestres, pro_regAcreditacion, pro_fechaReg, pro_altaCalidad, pro_fechaCalidad) VALUES (?,?,?,?,?,?,?,?,?)',
                        [valuesProgram.nombreP, valuesProgram.codigoP, valuesProgram.modalidadP, valuesProgram.jornadaP, valuesProgram.semestresP, valuesProgram.regisCal, valuesProgram.regisfecha, valuesProgram.acreditacion, valuesProgram.acreditafecha],
                        async (err, result) => {
                        if (err) {
                                console.error('Error registering program:', err);
                                return res.status(500).json({ error: 'Error registering program' });
                        }
                                const programaId = result.insertId; 
                                const programaNombre = valuesProgram.nombreP; 
                        res.status(200).json({ message: 'Programa registrado exitosamente', idPrograma: programaId, pro_nombre: programaNombre });
                }
                );
        } catch (error) {
                console.error('Error registering program:', error);
                res.status(500).json({ error: 'An error occurred while registering program' });
        }
});

router.get('/estadoPlan/:idPrograma/:estado', (req, res) => {
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

router.get('/programaPlan/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{
                pool.query('SELECT idPrograma, pro_nombre, pro_SNIES, pro_modalidad, pro_jornada, pro_regAcreditacion, pro_fechaReg, pro_altaCalidad, pro_fechaCalidad, pln_semestres FROM planestudios INNER JOIN programa ON idPrograma = pro_id WHERE idPlanEstudios = ?', 
                [idPlan], (err, results) => {
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

router.post('/crearPlan/:accion/:idPrograma', async (req, res) => { 
        const idPrograma = req.params.idPrograma;
        const accion = req.params.accion;
        const { idUsuario,  numSemestre } = req.body;
        try {   
                pool.query(
                        `INSERT INTO planestudios (pro_id, pln_estado, pln_fechaCreacion, pln_fechaCambio, pln_semestres, usuCambio_id)
                        VALUES (?, "En desarrollo", NOW(), NOW(), ?, ?)
                        `,
                        [idPrograma, numSemestre, idUsuario],
                        (error, result) => {
                                if (error) {
                                        console.error(error);
                                        res.status(500).json({ error: 'Error al crear el nuevo plan de estudios' });
                                } else {
                                const nuevoPlanId = result.insertId;
                                
                                if (accion === "duplicar") {
                                        pool.query(`SELECT mat_nombre, mat_codigo, mat_semestre, mat_creditos, mat_horas, mat_descripcion, mat_tipo, area_id
                                        FROM materia INNER JOIN planestudios ON idPlanEstudios = plan_id WHERE pln_estado = "Actual" AND pro_id = ?`, [idPrograma], (error, materias) => {
                                        if (error) {
                                                console.error(error);
                                                res.status(500).json({ error: 'Error al obtener las materias para duplicar' });
                                        } else {
                                                for (const materia of materias) {
                                                pool.query('INSERT INTO materia (mat_nombre, mat_codigo, mat_semestre, mat_creditos, mat_horas, mat_descripcion, mat_tipo, area_id, plan_id) VALUES (?,?,?,?,?,?,?,?,?)',
                                                [materia.mat_nombre, materia.mat_codigo, materia.mat_semestre, materia.mat_creditos, materia.mat_horas, materia.mat_descripcion, materia.mat_tipo, materia.area_id, nuevoPlanId]
                                                );}
                                                res.status(200).json({ message: 'Operación completada exitosamente', nuevoPlanId });
                                        }
                                        });
                                }
                        }
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
                                        console.error('Error al actualizar el plan:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
                                } else {
                                        res.json({ message: 'Plan actualizado correctamente' });
                                }
                        });
                        } catch (error) {
                                console.error('Error al actualizar el plan:', error);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
                        }
                }
                else{
                        try {
                                pool.query('UPDATE planestudios SET pln_estado=?, pln_fechaCambio = ? WHERE idPlanEstudios = ?;',
                                [estado, fechaActual, idPlan], (err) => {
                                if (err) {
                                        console.error('Error al actualizar el plan:', err);
                                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
                                } else {
                                        res.json({ message: 'Plan actualizado correctamente' });
                                }
                        });
                        } catch (error) {
                                console.error('Error al actualizar el plan:', error);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
                        }
                }
        }
        else{
                try {
                        pool.query('UPDATE planestudios SET pln_fechaCambio = ?, usuCambio_id=? WHERE idPlanEstudios = ?;',
                        [fechaActual, idUsuario, idPlan], (err) => {
                        if (err) {
                                console.error('Error al actualizar el plan:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
                        } else {
                                res.json({ message: 'Plan actualizada correctamente' });
                        }
                });
                        
                } catch (error) {
                        console.error('Error al actualizar el plan:', error);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar el plan' });
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
        try {
                pool.query( 'INSERT INTO comentario (com_fecha, com_detalle, id_usuario, id_plan) VALUES (?,?,?,?)',
                [ fechaActual, valueComment, idUsuario, idPlan ],
                async (err) => {
                        if (err) {
                        return res.status(500).json({ error: 'Error registering plan' });
                        }
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Comentario registrado exitosamente' });
                });
        } catch (error) {
                res.status(500).json({ error: 'An error occurred while registering coment' });
        }
});

router.get('/area/:idArea', (req, res) => {
        const idArea = req.params.idArea;
        try{
                pool.query('SELECT * FROM areaconocimiento WHERE idArea = ?', [idArea], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando area:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando el listado de areas' });
        }
});

router.put('/area/:idArea', (req, res) => {
        const idArea = req.params.idArea;
        const { valuesArea, color } = req.body;
        try {
                pool.query('UPDATE areaconocimiento SET are_nombre=?, are_iniciales=?, are_color=? WHERE idArea = ?;',
                [valuesArea.nombre, valuesArea.iniciales, color, idArea], (err) => {
                if (err) {
                        console.error('Error al actualizar la materia:', err);
                        res.status(500).json({ error: 'Ha ocurrido un error al actualizar la materia' });
                } else {
                        res.json({ message: 'Areaa actualizada correctamente' });
                }
        });
                
        } catch (error) {
                console.error('Error al actualizar la area:', error);
                res.status(500).json({ error: 'Ha ocurrido un error al actualizar el area' });
        }
});

router.post('/area/:idArea', async (req, res) => { 
        const idArea = req.params.idArea;
        const { valuesArea, color } = req.body;
        try {
                pool.query( 'INSERT INTO areaconocimiento (are_nombre, are_iniciales, are_color) VALUES (?,?,?)',
                [ valuesArea.nombre, valuesArea.iniciales, color ],
                async (err) => {
                        if (err) {
                        return res.status(500).json({ error: 'Error registering area' });
                        }
                        // Envía una respuesta de éxito al cliente
                        res.status(200).json({ message: 'Area registrada exitosamente' });
                });
        } catch (error) {
                res.status(500).json({ error: 'An error occurred while registering area' });
        }
});

router.delete('/area/:idArea', (req, res) => {
        const idArea = req.params.idArea;
        try{
                pool.query('DELETE FROM areaconocimiento WHERE idArea = ?', [idArea], async (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                res.status(500).json({ error: 'Ha ocurrido un error identificando el area' });
        }
});

router.get('/listaAreas', (req, res) => {
        try{
                pool.query('SELECT * FROM areaconocimiento', (err, results) => {
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
                pool.query('SELECT a.idMateria, a.mat_nombre, a.mat_codigo, a.mat_semestre , a.mat_horas, a.mat_creditos,  b.are_nombre, b.are_iniciales, b.are_color FROM materia a INNER JOIN areaconocimiento b ON  b.idArea = a.area_id WHERE a.plan_id = ?',[idPlan],(err, results) => {
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

router.post('/materia/:idPlan', async (req, res) => { 
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

router.get('/areasPlan/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{
                pool.query('SELECT  DISTINCT idArea, are_nombre, are_color FROM areaconocimiento INNER JOIN materia ON area_id = idArea INNER JOIN planestudios ON idPlanestudios = plan_id WHERE idPlanEstudios = ?',[idPlan],(err, results) => {
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

router.get('/infoPrograma/:snies', (req, res) => {
        const snies = req.params.snies;
        try{
                pool.query('SELECT idPrograma, pro_nombre FROM programa WHERE pro_SNIES = ?',[snies],(err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando la información del programa:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del programa' });
        }
});

router.get('/listaUsuario', (req, res) => {
        try{
                pool.query('SELECT idusuario, usu_correo, usu_nombre, usu_apellido, usu_documento, usu_rol FROM usuario',(err, results) => {
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

router.get('/listaDirectores/:idPrograma', (req, res) => {
        const idPrograma = req.params.idPrograma;
        try{ 
                pool.query('SELECT idUsuario, usu_nombre, usu_apellido, usu_correo, fac_sede FROM usuario INNER JOIN director ON director_id = idUsuario INNER JOIN facultad on idfacultad = fac_id WHERE pro_id = ?;', [idPrograma], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando lista de directores:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del director' });
        }
});

router.get('/firmasDirectores/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{ 
                pool.query('SELECT idUsuario, usu_nombre, usu_apellido, usu_firma, fac_sede FROM usuario INNER JOIN director ON director_id = idUsuario INNER JOIN facultad ON idfacultad = fac_id INNER JOIN planestudios ON planestudios.pro_id = director.pro_id WHERE idPlanEstudios = ? GROUP BY idUsuario', [idPlan], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando la firma de los directores:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la firma de los directores' });
        }
});

router.get('/firmasDecanos/:idPlan', (req, res) => {
        const idPlan = req.params.idPlan;
        try{ 
                pool.query('SELECT idUsuario, usu_nombre, usu_apellido, usu_firma, fac_nombre, fac_sede FROM usuario INNER JOIN facultad ON usu_id = idUsuario INNER JOIN director ON fac_id = idFacultad INNER JOIN planestudios ON planestudios.pro_id = director.pro_id WHERE idPlanEstudios = ? GROUP BY idUsuario', [idPlan], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando la firma de los decanos:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la firma de los decanos' });
        }
});

router.get('/listaProgramas/:idUsuario', (req, res) => {
        const idUsuario = req.params.idUsuario;
        try{
                pool.query('SELECT DISTINCT idPrograma, pro_nombre FROM programa INNER JOIN director ON pro_id = idprograma INNER JOIN facultad ON idfacultad = fac_id WHERE usu_id = ? ORDER BY pro_nombre', [idUsuario], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del director' });
        }
});

router.get('/decano/:idUsuario', (req, res) => {
        const idUsuario = req.params.idUsuario;
        try{
                pool.query('SELECT idFacultad, fac_nombre, fac_sede FROM facultad WHERE usu_id = ?', [idUsuario], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del decano' });
        }
});

router.get('/idsDirector/:idUsuario', (req, res) => {
        const idUsuario = req.params.idUsuario;
        try{ 
                pool.query('SELECT idPrograma, pro_nombre, fac_nombre FROM programa INNER JOIN director ON idprograma = pro_id INNER JOIN facultad ON idfacultad = fac_id WHERE director_id = ?', [idUsuario], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                        //console.log("resultados: "+results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del director' });
        }
});

router.get('/findDirector/:idUsuario', (req, res) => {
        const idUsuario = req.params.idUsuario;
        try{ 
                pool.query('SELECT idPrograma, pro_nombre, fac_sede, fac_nombre FROM programa INNER JOIN director ON idprograma = pro_id INNER JOIN facultad ON idfacultad = fac_id WHERE director_id = ?', [idUsuario], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                        //console.log("resultados: "+results);
                });
        }
        catch{
                console.error('Error identificando plan de estudios:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del director' });
        }
});

router.post('/director/:idPrograma', (req, res) => {
        const idPrograma = req.params.idPrograma;
        const { valuesDirec } = req.body;

        pool.query(
                'SELECT idUsuario FROM usuario WHERE usu_documento = ?',[valuesDirec.documento], (err, results) => {
                if (err) {
                        console.error('Error al consultar el usuario:', err);
                        res.status(500).json({ error: 'Ha ocurrido un error al buscar el usuario' });
                        return;
                }
                console.log(results);
                if (results.length > 0) {
                        const idUsuario = results[0].idUsuario;
                        pool.query(
                        'INSERT INTO director (pro_id,fac_id, director_id) VALUES (?,?,?);',
                        [idPrograma, 1, idUsuario],
                        (err) => {
                        if (err) {
                                console.error('Error al actualizar el plan de estudios en desarrollo:', err);
                                res.status(500).json({ error: 'Ha ocurrido un error al ingresas un nuevo director' });
                        } else {
                                        res.json({ message: 'Director añadido correctamente' });
                                
                        }
                });
                } 
        });
});  

router.get('/relacion/:tipo/:idMateria', (req, res) => {
        const tipoRel = req.params.tipo;
        const idMateria = req.params.idMateria;
        try{ 
                pool.query('SELECT mat2_id as id, mat_nombre as nombre FROM relacionmateria INNER JOIN materia ON idMateria = mat2_id WHERE rel_tipo= ? and mat1_id = ?', [tipoRel, idMateria], (err, results) => {
                        if (err) {
                                return res.status(500).json({ error: 'Error retrieving data from the database' });
                        }
                        res.json(results);
                });
        }
        catch{
                console.error('Error identificando materias:', error);
                res.status(500).json({ error: 'Ha ocurrido un error identificando la información del director' });
        }
});

router.post('/relacion/:idMateria', (req, res) => {
        const idMateria = req.params.idMateria;
        const { tipo, matRel } = req.body;
        console.log("idMateria: " + idMateria);
        console.log("tipo: " + tipo);
        console.log("matRel: " + matRel);

        try {
                pool.query('INSERT INTO relacionmateria (rel_tipo, mat1_id, mat2_id) VALUES (?, ?, ?)', [tipo, idMateria, matRel]);
                res.status(200).json({ message: 'Relaciones eliminadas exitosamente' });
        } catch (error) {
                console.error('Error al eliminar relaciones de materia:', error);
                res.status(500).json({ error: 'Error al eliminar relaciones de materia' });
        }
});

router.delete('/relacion/:idMateria', (req, res) => {
        const idMateria = req.params.idMateria;
        const { tipo, matRel } = req.query;
        try {
                pool.query('DELETE FROM relacionmateria WHERE rel_tipo = ? AND mat1_id = ? AND mat2_id = ?', [tipo, idMateria, matRel]);
                res.status(200).json({ message: 'Relaciones eliminadas exitosamente' });
        } catch (error) {
                console.error('Error al eliminar relaciones de materia:', error);
                res.status(500).json({ error: 'Error al eliminar relaciones de materia' });
        }
});

module.exports = router;