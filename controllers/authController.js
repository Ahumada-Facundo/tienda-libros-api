const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const register = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, contraseña, rol });
        res.status(201).json({ id_usuario: nuevoUsuario.id_usuario, nombre: nuevoUsuario.nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Iniciar sesión de usuario
const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const esContraseñaValida = await usuario.compararContraseña(contraseña);

        if (!esContraseñaValida) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
