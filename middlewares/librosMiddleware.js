// middlewares/librosMiddleware.js
const { body, validationResult } = require('express-validator');

// Validaciones para crear un libro
const validarLibro = async (req, res, next) => {
    try {
        // Verificar que el campo 'titulo' no esté vacío y tenga al menos 3 caracteres
        await body('titulo')
            .notEmpty().withMessage('El título del libro no puede estar vacío')
            .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres')
            .run(req);

        // Verificar que el campo 'autor' no esté vacío
        await body('autor')
            .notEmpty().withMessage('El autor del libro no puede estar vacío')
            .run(req);

        // Verificar que la 'categoria' no esté vacía
        await body('categoria')
            .notEmpty().withMessage('La categoría del libro no puede estar vacía')
            .run(req);

        // Verificar si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();  // Si no hay errores, continúa con el siguiente middleware o controlador
    } catch (error) {
        console.error("Error en el middleware de validación de libro:", error);
        return res.status(500).json({ message: 'Error en la validación del libro.' });
    }
};

module.exports = {
    validarLibro,
};
