const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const dbError = require('../errors/dbError');
const validateProperties = require('../util/validateProperties');

const validateBodyProperties = (properties) => {
    return (req, res, next) => {
        if(!req.body.data) {
            return next({status:400, message:'Request body data is missing'});
        }
        const {data} = req.body;
        properties.forEach(property => {
            if(!data[property]) {
                return next({status:400, message: `Parameter ${property} is missing`});
            }
        })
        next();
    }
}
// Returns a list of all users
const list = (req, res) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch(err => dbError(err, res))
}

// Registers a new user
const create = (req, res) => {
    console.log('omg')
    service.create(req.body.data)
        .then(() => {
            res.json({message: 'User successfully registered'});
        })
        .catch(err => dbError(err, res))
}

// Returns a user's data
const read = (req, res) => {
    const {userId} = req.params;
    service.read(userId)
        .then(data => {
            console.log('omg')
            res.json({data});
        })
        .catch(err => dbError(err, res))
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        validateBodyProperties(['username,email,password']),
        asyncErrorBoundary(create)
    ],
    read: asyncErrorBoundary(read)
}