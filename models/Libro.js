module.exports = (sequelize, DataTypes) => {
    const Libro = sequelize.define('Libro', {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Otros atributos...
    });

    return Libro;
};
