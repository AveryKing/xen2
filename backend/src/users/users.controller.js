const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Returns a list of all users
const list = (req,res) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch(err => dbError(err,req,res))
}

// Registers a new user
const create = (req,res) => {
    service.create()
        .then(data => {
            res.json({message:'User successfully registered'});
        })
        .catch(err => dbError(err,req,res))
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create)
}