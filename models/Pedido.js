const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Libro = require('./Libro');

const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    estado: {
        type: DataTypes.ENUM('pagado', 'en proceso', 'completado'),
        defaultValue: 'en proceso',
    },
});

// Relacionar con Usuario y Libro
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Pedido.belongsTo(Libro, { foreignKey: 'id_libro' });

module.exports = Pedido;
//asd