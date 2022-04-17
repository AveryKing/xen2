
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = process.env;

function jwtAuth (req, res, next)  {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_KEY, null,(err, decoded) => {
            if(err) {
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
            message: 'No token provided'
        })
    }
}

module.exports = jwtAuth;
