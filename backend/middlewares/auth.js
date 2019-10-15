const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const secret_key = "ssaudy";
    if (!token) {
        return res.json({
            "status": false,
            "message": "토큰이 존재하지 않습니다."
        })
    }
    const p = new Promise(
        ((resolve, reject) => {
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded)
            })
        })
    )
    const onError = (error) => {
        res.json({
            "status": false,
            "message": error.message
        })
    };

    p.then((decoded) => {
        req.decoded = decoded;
        next()
    }).catch(onError)
}

module.exports = authMiddleware;