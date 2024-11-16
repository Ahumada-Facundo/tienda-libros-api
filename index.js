const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Asegúrate de que sea './models', no './models/index'

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const libroRoutes = require('./routes/libroRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/pedidos', pedidoRoutes);

sequelize.sync({ force: false }) // Para sincronizar con la base de datos
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        app.listen(3000, () => {
            console.log('Servidor escuchando en el puerto 3000');
        });
    }).catch((error) => {
        console.error('Error de conexión a la base de datos:', error);
    });
