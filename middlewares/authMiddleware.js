const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mi_clave_secreta');


        req.user = decoded;

        next();
    } catch (error) {
        console.error("Error en la autenticación:", error);  // Para depuración
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
