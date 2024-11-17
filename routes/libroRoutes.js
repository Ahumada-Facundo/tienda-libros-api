// routes/libroRoutes.js
const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');  // Importamos el middleware de administrador

// Ruta para obtener todos los libros (accesible para todos los usuarios)
router.get('/libros', libroController.getAllLibros);

// Ruta para obtener un libro por su ID (accesible para todos los usuarios)
router.get('/libros/:id', authMiddleware, libroController.getLibroById);

// Ruta para crear un nuevo libro (solo accesible para administradores)
router.post('/libros', authMiddleware, isAdmin, libroController.createLibro);

// Ruta para actualizar un libro (solo accesible para administradores)
router.put('/libros/:id', authMiddleware, isAdmin, libroController.updateLibro);

// Ruta para eliminar un libro (solo accesible para administradores)
router.delete('/libros/:id', authMiddleware, isAdmin, libroController.deleteLibro);

module.exports = router;

