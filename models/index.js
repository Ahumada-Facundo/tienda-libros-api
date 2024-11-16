const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar los modelos
const Usuario = require('./Usuario');
const Libro = require('./Libro');
const Resena = require('./Resena');
const Pedido = require('./Pedido');

// Asociar los modelos con sequelize
const UsuarioModel = Usuario(sequelize, DataTypes);
const LibroModel = Libro(sequelize, DataTypes);
const ResenaModel = Resena(sequelize, DataTypes);
const PedidoModel = Pedido(sequelize, DataTypes);

// Exportar los modelos para usarlos en otros archivos
module.exports = {
    Usuario: UsuarioModel,
    Libro: LibroModel,
    Resena: ResenaModel,
    Pedido: PedidoModel,
    sequelize, // Para que puedas hacer uso de sequelize en otras partes
};
