const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Libro = sequelize.define('Libro', {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        formato: {
            type: DataTypes.ENUM('PDF', 'ePub', 'Mobi'),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        fecha_publicacion: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
    }, {
        timestamps: true,
        tableName: 'Libros',
    });

    return Libro;  // No olvides retornar el modelo
};
