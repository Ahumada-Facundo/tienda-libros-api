const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar las variables del archivo .env

// Crear una nueva instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,    // Nombre de la base de datos
    process.env.DB_USER,    // Nombre de usuario de MySQL
    process.env.DB_PASSWORD, // Contraseña del usuario de MySQL
    {
        host: process.env.DB_HOST, // Dirección del host (localhost si es local)
        dialect: 'mysql',  // El tipo de base de datos (mysql en este caso)
        logging: false,     // Para no mostrar las consultas SQL en la consola
    }
);

// Verificar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa!');
    })
    .catch((error) => {
        console.error('Error al conectar con la base de datos:', error);
    });

module.exports = sequelize;
