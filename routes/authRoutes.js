const express = require('express');
const { registerController } = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const { validarRegistroUsuario } = require('../middlewares/registerMiddleware');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', validarRegistroUsuario, registerController);

// Ruta para hacer login
router.post('/login', loginController);

module.exports = router;
