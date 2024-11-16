module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Usuarios', // Referencia a la tabla de usuarios
                key: 'id_usuario',
            },
        },
        // Otros atributos...
    });

    return Pedido;
};
