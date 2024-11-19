const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res) => {
    try {
        const { nombreUsuario, password } = req.body;
        const usuario = await Usuario.create({ nombreUsuario, password });
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.login = async (req, res) => {
    try {
        const { nombreUsuario, password } = req.body;
        const usuario = await Usuario.findOne({ where: { nombreUsuario } });

        if (!usuario || !(await usuario.validPassword(password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id, nombreUsuario: usuario.nombreUsuario },
            'secretKey',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
