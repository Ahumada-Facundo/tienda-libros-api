const models = require('../models');
const bcrypt = require('bcrypt');

// Obtener el usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        const usuario = await models.Usuario.findByPk(req.params.id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Actualizar usuario
const updateUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const usuario = await models.Usuario.findByPk(req.params.id_usuario);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Si el email o contraseña se proporcionan, actualizarlos
        if (email) usuario.email = email;
        if (nombre) usuario.nombre = nombre;
        if (contraseña) usuario.contraseña = bcrypt.hashSync(contraseña, 10);

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    const { id_usuario } = req.params;  // Cambiado de id a id_usuario para que coincida con la ruta
    console.log({ id_usuario });

    try {
        console.log(`Intentando eliminar el usuario con ID: ${id_usuario}`);

        // Verificar si el usuario existe
        const usuario = await models.Usuario.findByPk(id_usuario);

        if (!usuario) {
            console.log(`Usuario con ID ${id_usuario} no encontrado`);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario que está haciendo la solicitud es el mismo que el de la cuenta
        if (req.user.id_usuario !== parseInt(id_usuario) && req.user.rol !== 'administrador') {
            console.log('El usuario no tiene permisos para eliminar este usuario');
            return res.status(403).json({ message: 'No tienes permisos para eliminar este usuario' });
        }

        console.log(`Eliminando usuario con ID: ${id_usuario}`);
        // Eliminar al usuario
        await usuario.destroy();

        console.log(`Usuario con ID ${id_usuario} eliminado correctamente`);
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    getUsuarioById,
    updateUsuario,
    eliminarUsuario,
};
