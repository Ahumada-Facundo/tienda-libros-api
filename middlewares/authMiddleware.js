const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verificar el token con la misma clave secreta utilizada en la firma
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mi_clave_secreta');

        // Almacenar los datos del usuario en el objeto de la solicitud
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Error en la autenticación:", error);  // Para depuración
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
