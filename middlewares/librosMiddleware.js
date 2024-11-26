
const { body, validationResult } = require('express-validator');


const validarLibro = async (req, res, next) => {
    try {

        await body('titulo')
            .notEmpty().withMessage('El título del libro no puede estar vacío')
            .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres')
            .run(req);


        await body('autor')
            .notEmpty().withMessage('El autor del libro no puede estar vacío')
            .run(req);


        await body('categoria')
            .notEmpty().withMessage('La categoría del libro no puede estar vacía')
            .run(req);


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    } catch (error) {
        console.error("Error en el middleware de validación de libro:", error);
        return res.status(500).json({ message: 'Error en la validación del libro.' });
    }
};

module.exports = {
    validarLibro,
};
