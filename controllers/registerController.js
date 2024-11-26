const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const registerController = async (req, res) => {
    try {
        const { nombre, email, contraseña, rol } = req.body;


        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }


        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);


        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contraseña: contraseñaEncriptada,
            rol: rol || 'cliente',
        });

        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id_usuario: nuevoUsuario.id_usuario,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

module.exports = { registerController };
