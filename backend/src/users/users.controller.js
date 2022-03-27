const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const dbError = require('../errors/dbError');
// Returns a list of all users
const list = (req,res) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch(err => dbError(err,res))
}

// Registers a new user
const create = (req,res) => {
    service.create()
        .then(data => {
            res.json({message:'User successfully registered'});
        })
        .catch(err => dbError(err,res))
}

const read = (req,res) => {
    const {userId} = req.params;
    service.read(userId)
        .then(data => {
            res.json({data});
        })
        .catch(err => dbError(err,res))
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    read: asyncErrorBoundary(read)
}