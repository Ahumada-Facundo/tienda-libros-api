const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // Importar desde 'models'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateToken } = require('../middlewares/authMiddleware'); // Asegúrate de tener el middleware de autenticación

// Ruta para login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener el perfil del usuario (requiere token)
router.get('/perfil', validateToken, async (req, res) => {
    const userId = req.userId;

    try {
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
