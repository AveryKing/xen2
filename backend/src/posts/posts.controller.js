const service = require('./posts.service');

const doParamsExist = (req, res, next) => {
    const requiredProps = ['title', 'content'];
    const missingParams = [];
    const {data} = req.body;
    if (!data) {
        next({
            status: 400,
            message: 'Request body is malformed'
        })
    }
    requiredProps.forEach(property => {
        if (!data[property]) {
            missingParams.push(property)
        }
    })
    return missingParams.length
        ? next({status: 400, message: `Missing parameters: ${missingParams.join(', ')}`})
        : next();
}

const create = (req,res,next) => {

}
const list = (req, res, next) => {
    service.list()
        .then(data => {
            return res.json({data});
        })
        .catch((err) => {
            console.error(err);
            return next({
                status: 500,
                message: 'There was an error retrieving posts from the database.'
            })
        })
}

const read = (req, res, next) => {
    const {postId} = req.params;
    service.read(postId)
        .then(data => {
            if (!data.length) {
                return next({
                    status: 404,
                    message: 'Post not found'
                });
            }
            res.status(200).json({data});
        })
        .catch(() => {
            return next({
                status: 500,
                message: 'There was an error retrieving this post from the database.'
            })
        })
}
module.exports = {
    list,
    read,
    create: [doParamsExist, create]
}