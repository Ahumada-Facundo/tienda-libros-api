const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario tiene rol de administrador
const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del encabezado Authorization

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verifica el token con la clave secreta

        req.user = decoded; // Adjuntar la información del usuario decodificado en el request

        // Verificar si el rol del usuario es 'administrador'
        if (req.user.rol !== 'administrador') {
            return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
        }

        next(); // Si el usuario es administrador, continuar con la siguiente función
    } catch (error) {
        console.error("Error en el middleware de administración:", error);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = isAdmin;
