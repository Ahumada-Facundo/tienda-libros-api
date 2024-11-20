// middlewares/resenaMiddleware.js
const { body, validationResult } = require('express-validator');
const models = require('../models');

// Validaciones para crear una reseña
const validarResena = async (req, res, next) => {
    try {
        // Validar que el 'texto' no esté vacío y tenga al menos 10 caracteres
        await body('texto')
            .notEmpty().withMessage('El texto de la reseña no puede estar vacío')
            .isLength({ min: 10 }).withMessage('El texto debe tener al menos 10 caracteres')
            .run(req);

        // Validar que la 'calificacion' sea un número entre 1 y 5
        await body('calificacion')
            .isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entre 1 y 5')
            .run(req);

        // Validar la existencia del libro
        const libro = await models.Libro.findByPk(req.body.id_libro);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        // Verificar si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();  // Si no hay errores, continúa con el siguiente middleware o controlador
    } catch (error) {
        console.error("Error en el middleware de validación de reseña:", error);
        return res.status(500).json({ message: 'Error en la validación de la reseña.' });
    }
};

module.exports = {
    validarResena,
};
