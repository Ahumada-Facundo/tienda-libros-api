
const models = require('../models');


const getResenas = async (req, res) => {
    try {

        const resenas = await models.Resena.findAll({
            include: [{
                model: models.Usuario,
                as: 'usuario',
                attributes: { exclude: ['contraseña', 'fecha_registro', 'rol', 'email'] }, // Excluir la columna 'contraseña'
            }, {
                model: models.Libro,
                as: 'libros',
                attributes: ['id_libro', 'titulo'],
            }],
        });

        res.json(resenas);
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        res.status(500).json({ message: 'Error al obtener reseñas' });
    }
};



const getResenaById = async (req, res) => {
    try {
        const { id_resena } = req.params;
        const resena = await models.Resena.findByPk(id_resena, {
            include: [
                { model: models.Libro, as: 'libros' },
                { model: models.Usuario, as: 'usuario' }
            ]
        });

        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        res.json(resena);
    } catch (error) {
        console.error('Error al obtener la reseña:', error);
        res.status(500).json({ error: 'Error al obtener la reseña' });
    }
};


const createResena = async (req, res) => {
    const { id_libro, texto, calificacion } = req.body;
    const { id_usuario } = req.user;

    try {
        const existingResena = await models.Resena.findOne({
            where: { id_libro, id_usuario }
        });

        if (existingResena) {
            return res.status(400).json({ error: 'Ya has dejado una reseña para este libro' });
        }

        const newResena = await models.Resena.create({
            id_libro,
            id_usuario,
            texto,
            calificacion,
        });

        res.status(201).json(newResena);
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        res.status(500).json({ error: 'Error al crear la reseña' });
    }
};


const updateResena = async (req, res) => {
    const { id_resena } = req.params;
    const { texto, calificacion } = req.body;
    const { id_usuario } = req.user;

    try {
        const resena = await models.Resena.findByPk(id_resena);

        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        if (resena.id_usuario !== id_usuario) {
            return res.status(403).json({ error: 'No tienes permisos para actualizar esta reseña' });
        }

        if (texto) resena.texto = texto;
        if (calificacion) resena.calificacion = calificacion;

        await resena.save();

        res.json(resena);
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ error: 'Error al actualizar la reseña' });
    }
};


const deleteResena = async (req, res) => {
    const { id_resena } = req.params;
    const { id_usuario } = req.user;

    try {
        const resena = await models.Resena.findByPk(id_resena);

        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        if (resena.id_usuario !== id_usuario) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar esta reseña' });
        }

        await resena.destroy();

        res.json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        res.status(500).json({ error: 'Error al eliminar la reseña' });
    }
};

module.exports = {
    getResenas,
    getResenaById,
    createResena,
    updateResena,
    deleteResena,
};
