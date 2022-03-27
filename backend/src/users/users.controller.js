const service = require('./users.service');

const list = (req,res) => {
    service.list()
        .then(data => {
            res.json({data});
        })
}

module.exports = {

}