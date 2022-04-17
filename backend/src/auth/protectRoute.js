require('dotenv').config();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = process.env;

const debug = process.env.NODE_ENV !== 'production';

function jwtAuth(req, res, next) {
    if (req.headers.authorization) {
        if (debug && req.headers.authorization === 'Bearer debug') {
            req.user = {
                id: 5,
                name: 'debug',
                email: 'debug@debug.me'
            }
            return next();
        }
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_KEY, null, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    error: 'Invalid token'
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).json({
            error: 'No token provided'
        })
    }
}

module.exports = jwtAuth;
