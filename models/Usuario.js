// Usuario.js
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        contraseña: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        rol: {
            type: DataTypes.ENUM('cliente', 'administrador'),
            defaultValue: 'cliente',
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'Usuarios',
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Pedido, {
            foreignKey: 'id_usuario',
            as: 'pedidos',
        });

        Usuario.hasMany(models.Resena, {
            foreignKey: 'id_usuario',
            as: 'resenas',
        });
    };

    return Usuario;
};

