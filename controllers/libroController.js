const { Libro } = require('../models');

const getAllLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.status(200).json(libros);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los libros', error: err.message });
    }
};

const getLibroById = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json(libro);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el libro', error: err.message });
    }
};


const createLibro = async (req, res) => {
    try {
        const { titulo, autor, genero, precio, descripcion, formato, stock, fecha_publicacion } = req.body;


        if (!titulo || !autor || !precio || !formato) {
            return res.status(400).json({ message: 'Faltan campos requeridos: titulo, autor, precio y formato son obligatorios.' });
        }

        if (!['PDF', 'ePub', 'Mobi'].includes(formato)) {
            return res.status(400).json({ message: 'Formato inválido. Debe ser uno de los siguientes: PDF, ePub, Mobi.' });
        }


        const nuevoLibro = await Libro.create({
            titulo,
            autor,
            genero,
            precio,
            descripcion,
            formato,
            stock: stock || 0,
            fecha_publicacion
        });


        res.status(201).json({ message: 'Libro creado exitosamente', libro: nuevoLibro });
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ message: 'Error al crear el libro', error: error.message });
    }
};



const updateLibro = async (req, res) => {
    try {
        const { titulo, autor, descripcion, precio } = req.body;
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;
        libro.descripcion = descripcion || libro.descripcion;
        libro.precio = precio || libro.precio;
        await libro.save();
        res.status(200).json(libro);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el libro', error: err.message });
    }
};

const deleteLibro = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        await libro.destroy();
        res.status(204).json({ message: 'Libro eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el libro', error: err.message });
    }
};

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro,
};
