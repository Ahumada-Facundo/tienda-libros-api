// Libro.js
module.exports = (sequelize, DataTypes) => {
    const Libro = sequelize.define('Libro', {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        autor: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        formato: {
            type: DataTypes.ENUM('PDF', 'ePub', 'Mobi'),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        fecha_publicacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'libros',
    });

    Libro.associate = (models) => {
        Libro.belongsToMany(models.Pedido, {
            through: models.PedidoLibro,
            foreignKey: 'id_libro',
            otherKey: 'id_pedido',
            as: 'pedidos',
        });

        Libro.hasMany(models.Resena, {
            foreignKey: 'id_libro',
            as: 'resenas',
        });
    };

    return Libro;
};
