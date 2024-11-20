const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Obtener usuario por ID
router.get('/:id_usuario', authMiddleware, adminMiddleware, usuarioController.getUsuarioById);

// Actualizar usuario
router.put('/:id_usuario', authMiddleware, usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id_usuario', authMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
