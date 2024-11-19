const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Importar los modelos
const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Libro = require('./Libro')(sequelize, Sequelize.DataTypes);
const Pedido = require('./Pedido')(sequelize, Sequelize.DataTypes);
const Resena = require('./Resena')(sequelize, Sequelize.DataTypes);
const PedidoLibro = require('./PedidosLibros')(sequelize, Sequelize.DataTypes); // Añadido el modelo intermedio

//manejar las asociaciones
const models = {
    Usuario,
    Libro,
    Pedido,
    Resena,
    PedidoLibro,
};

// Definir las asociaciones entre los modelos
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});


models.sequelize = sequelize;

module.exports = models;
