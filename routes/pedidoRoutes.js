const express = require('express');
const router = express.Router();
const { Pedido } = require('../models'); // Importar desde 'models'

router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoPedido = await Pedido.create(req.body);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
