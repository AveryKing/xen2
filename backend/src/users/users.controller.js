const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Returns a list of all users
const list = (req,res) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            console.error(err);
            res.json({error: `code ${err.code}`});
        })
}

// Registers a new user
const create = (req,res) => {
    service.create()
        .then(data => {
            res.json({data});
        })
        .catch(err => {
            console.error(err);
            res.json({error: `code: ${err.code}`});
        })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create)
}