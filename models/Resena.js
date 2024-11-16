const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Libro = require('./Libro');

const Resena = sequelize.define('Resena', {
    id_resena: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    calificacion: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comentario: {
        type: DataTypes.TEXT,
    },
    fecha_resena: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Relacionar con Usuario y Libro
Resena.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Resena.belongsTo(Libro, { foreignKey: 'id_libro' });

module.exports = Resena;
