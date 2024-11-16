const express = require('express');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Libro = require('./models/Libro');
const Pedido = require('./models/Pedido');
const Resena = require('./models/Resena');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bienvenido a la Tienda de Libros');
});

// Verificar la conexión y las relaciones
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa!');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
