module.exports = (sequelize, DataTypes) => {
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

    return Resena;
};
