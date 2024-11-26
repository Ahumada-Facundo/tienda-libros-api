const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

const loginController = async (req, res) => {
    try {
        const { email, contraseña } = req.body;


        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }


        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }


        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET_KEY || 'mi_clave_secreta',
            { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' }
        );


        res.json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al intentar hacer login' });
    }
};


module.exports = loginController;
