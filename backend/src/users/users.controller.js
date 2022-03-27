const service = require('./users.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

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

module.exports = {
    list: asyncErrorBoundary(list)
}