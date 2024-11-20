// middlewares/registerMiddleware.js
const { body, validationResult } = require('express-validator');

const validarRegistroUsuario = async (req, res, next) => {
    try {
        // Validar que el 'nombre' no esté vacío y tenga al menos 3 caracteres
        await body('nombre')
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
            .run(req);

        // Validar que el 'email' sea un formato válido
        await body('email')
            .isEmail().withMessage('El correo electrónico no es válido')
            .normalizeEmail()
            .run(req);

        // Validar que la 'contraseña' tenga al menos 6 caracteres
        await body('contraseña')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
            .run(req);

        // Verificar si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();  // Si no hay errores, continúa con el siguiente middleware o controlador
    } catch (error) {
        console.error("Error en el middleware de validación de usuario:", error);
        return res.status(500).json({ message: 'Error en la validación del usuario.' });
    }
};

module.exports = {
    validarRegistroUsuario,
};
