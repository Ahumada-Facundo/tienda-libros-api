const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');  // Importa dotenv
const authRoutes = require('./routes/authRoutes');
const libroRoutes = require('./routes/libroRoutes');

dotenv.config();  // Cargar variables de entorno

const app = express();

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Usar las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

// Usar las rutas de libros bajo el prefijo /api
app.use('/api', libroRoutes);  // Esto permite acceder a las rutas de libros, como /api/libros

// Puerto en el que escuchará el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
