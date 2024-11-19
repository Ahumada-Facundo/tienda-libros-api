// PedidoLibro.js
module.exports = (sequelize, DataTypes) => {
    const PedidoLibro = sequelize.define('PedidoLibro', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        timestamps: false,
        tableName: 'pedidos_libros',
    });

    return PedidoLibro;
};
