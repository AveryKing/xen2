const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const dbError = require('../errors/dbError');

// Validates request parameters
const validateParams = (req, res, next) => {
    const requiredProperties = ['username', 'password', 'email'];
    const missingParameters = [];
    const {data} = req.body;
    if (!data) return res.status(400).json({error: 'Request body is malformed'})

    requiredProperties.forEach(property => {
        if (!data[property]) {
            missingParameters.push(property)
        }
    })
    return missingParameters.length
        ? res.status(400).json({error: `Missing parameters: ${missingParameters.join(', ')}`})
        : next();
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
    service.create(req.body.data)
        .then((data) => {
            res.json({data})
          //  res.json({message: 'User successfully registered'});
        })
        .catch(err => dbError(err, res))
}

// Returns a user's data
const read = (req, res) => {
    const {userId} = req.params;
    service.read(userId)
        .then(data => {
            if(!data.length) return res.status(404).json({error:'User not found'});
            res.json({data});
        })
        .catch(err => dbError(err, res,404))
}

module.exports = {
    list: list,
    create: [
        validateParams,
        create
    ],
    read: read
}