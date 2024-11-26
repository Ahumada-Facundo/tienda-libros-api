const jwt = require('jsonwebtoken');


const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;


        if (req.user.rol !== 'administrador') {
            return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
        }

        next();
    } catch (error) {
        console.error("Error en el middleware de administración:", error);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = isAdmin;
