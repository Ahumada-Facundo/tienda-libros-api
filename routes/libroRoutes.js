const express = require('express');
const router = express.Router();
const { Libro } = require('../models'); // Asegúrate de que sea './models', no './models/Libro'

router.get('/', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
