const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un nuevo pedido
router.post('/', authMiddleware, pedidoController.createPedido);  // Cambié '/pedidos' a '/' ya que ya está definido el prefijo en index.js

// Listar todos los pedidos
router.get('/', authMiddleware, pedidoController.getPedidos);

// Obtener pedido por ID
router.get('/:id', authMiddleware, pedidoController.getPedidoById);

module.exports = router;
