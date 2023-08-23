const multer = require('multer');

// Configurar opciones de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.mimetype.split('/')[1]; // Obtener la extensión del archivo
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // Nombre del archivo con extensión
    }
});

// Validar tipos de archivo
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.mimetype.split('/')[1];
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true); // Permitir la carga
    } else {
        cb(new Error('Formato de archivo no admitido')); // Rechazar la carga
    }
};

// Crear el middleware de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Aplicar la validación de tipos de archivo
});

module.exports = upload;
