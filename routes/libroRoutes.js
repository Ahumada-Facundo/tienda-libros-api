const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const { validarLibro } = require('../middlewares/librosMiddleware');

router.get('/libros', libroController.getAllLibros);

router.get('/libros/:id', authMiddleware, libroController.getLibroById);

router.post('/libros', validarLibro, authMiddleware, isAdmin, libroController.createLibro);

router.put('/libros/:id', authMiddleware, isAdmin, libroController.updateLibro);

router.delete('/libros/:id', authMiddleware, isAdmin, libroController.deleteLibro);

module.exports = router;

