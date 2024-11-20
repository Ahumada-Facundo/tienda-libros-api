// routes/resenaRoutes.js
const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { validarResena } = require('../middlewares/resenaMiddleware');
const { validarRegistroUsuario } = require('../middlewares/registerMiddleware');
const { validarLibro } = require('../middlewares/librosMiddleware');

// Obtener todas las reseñas
router.get('/', authMiddleware, resenaController.getResenas);

// Obtener una reseña por ID
router.get('/:id_resena', authMiddleware, resenaController.getResenaById);

// Crear una nueva reseña
router.post('/', validarRegistroUsuario, validarResena, validarLibro, authMiddleware, resenaController.createResena);

// Actualizar una reseña
router.put('/:id_resena', authMiddleware, resenaController.updateResena);

// Eliminar una reseña
router.delete('/:id_resena', authMiddleware, resenaController.deleteResena);

module.exports = router;
