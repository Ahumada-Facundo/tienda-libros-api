const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const libroRoutes = require('./routes/libroRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const resenaRoutes = require('./routes/resenaRoutes');
dotenv.config();  // Cargar variables de entorno

const app = express();

app.use(express.json());

app.use('/api/resenas', resenaRoutes);
app.use('/api/auth', authRoutes);

app.use('/api', libroRoutes);

app.use('/api/pedidos', pedidoRoutes);

app.use('/api/usuarios', usuarioRoutes);

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
