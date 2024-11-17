// models/Usuario.js
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
            defaultValue: sequelize.NOW,
            allowNull: true,
        },
        rol: {
            type: DataTypes.ENUM('cliente', 'administrador'),
            defaultValue: 'cliente',
            allowNull: true,
        },
    }, {
        tableName: 'usuarios',
        timestamps: false,
    });

    return Usuario;
};
