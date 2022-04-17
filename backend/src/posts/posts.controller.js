const service = require('./posts.service');
const jwtAuth = require('../auth/protectRoute');

function doParamsExist(req, res, next) {
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

function isTitleValid(req, res, next) {
    return req.body.data.title.length < 8
        ? next({status: 400, message: 'Title must be at least 8 characters long'})
        : next();
}

function isContentValid(req, res, next) {
    return req.body.data.content.length < 20
        ? next({status: 400, message: 'Content must be at least 20 characters long'})
        : next();
}

function create(req, res, next) {
    const newPost = req.body.data;
    newPost.creator = req.user.id;
    service.create(newPost)
        .then(post => res.status(201).json({
                    id: post[0].id,
                    ...req.body.data
                }
            )
        )
        .catch(err => {
            console.error(err);
            next({
                status: 500,
                message: 'There was an error creating your post.'
            })
        })
}

function list(req, res, next) {
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

function read(req, res, next) {
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
        .catch((err) => {
            console.error(err)
            return next({
                status: 500,
                message: 'There was an error retrieving this post from the database.'
            })
        })
}

module.exports = {
    list,
    read,
    create: [
        jwtAuth,
        doParamsExist,
        isTitleValid,
        isContentValid,
        create
    ]
}