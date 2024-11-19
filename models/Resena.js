// Resena.js
module.exports = (sequelize, DataTypes) => {
    const Resena = sequelize.define('Resena', {
        id_resena: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_libro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    }, {
        timestamps: true,
        tableName: 'resenas',
    });

    Resena.associate = (models) => {
        Resena.belongsTo(models.Libro, {
            foreignKey: 'id_libro',
            as: 'libros',
        });

        Resena.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario',
        });
    };

    return Resena;
};
