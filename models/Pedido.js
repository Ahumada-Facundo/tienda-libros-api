// Pedido.js
module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        estado: {
            type: DataTypes.ENUM('pagado', 'en proceso', 'completado'),
            defaultValue: 'en proceso',
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'pedidos',
    });

    Pedido.associate = (models) => {
        Pedido.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario',
        });

        Pedido.belongsToMany(models.Libro, {
            through: models.PedidoLibro,
            foreignKey: 'id_pedido',
            otherKey: 'id_libro',
            as: 'libros',
        });
    };

    return Pedido;
};
