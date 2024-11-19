const express = require('express');
const { registerController } = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registerController);

// Ruta para hacer login
router.post('/login', loginController);

module.exports = router;
