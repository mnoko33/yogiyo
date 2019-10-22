const _jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtconfig');

const jwt = {
    // create jwt
    createJWT: async function(user) {
        const payload = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
        };
        // return jwt.sign(payload, secret_key, { expiresIn: '15m' });
        return _jwt.sign(payload, jwtConfig.secret_key, { expiresIn: '1000h' });
    },
    // jwt decode
    decodeJWT: async function(token) {
        const secret_key = jwtConfig.secret_key;
        const decodedToken = new Promise(
            ((resolve, reject) => {
                _jwt.verify(token, secret_key, (err, decoded) => {
                    if (err) reject(err);
                    resolve(decoded)
                })
            })
        );
        return await decodedToken
    }
};

module.exports = jwt;