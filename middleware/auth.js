const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

const secret = 'your_jwt_secret_key'; // Reemplaza esto con tu clave secreta

const authenticateJwt = expressJwt({
    secret,
    algorithms: ['HS256'],
    requestProperty: 'auth', // Donde se almacenará la información del token decodificado
});

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

module.exports = {
    authenticateJwt,
    generateToken,
};
