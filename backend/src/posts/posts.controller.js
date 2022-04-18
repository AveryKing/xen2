const service = require('./posts.service');
const jwtAuth = require('../auth/jwtAuth');

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

function like(req,res,next) {
    const { postId } = req.params;
    const { id } = req.user;
    service.like(postId, id)
        .then(likes => {
            if(!likes) {
                return next({
                    status:400,
                    message: 'You have already liked this post'
                })
            } else {
                return res.status(201).json({
                    likes:likes[0].likes
                })
            }
        })
        .catch(err => {
            console.error(err);
            return next({
                status:500,
                message: 'There was an error liking this post.'
            })
        })
}

function unlike(req,res,next) {
    const { postId } = req.params;
    const { id } = req.user;
    service.unlike(postId, id)
        .then(likes => {
            if(!likes) {
                return next({
                    status:400,
                    message: 'You have not yet liked this post'
                })
            } else {
                return res.status(201).json({
                    likes:likes[0].likes
                })
            }
        })
        .catch(err => {
            console.error(err);
            return next({
                status:500,
                message: 'There was an error unliking this post.'
            })
        })
}

module.exports = {
    list,
    read,
    like:[jwtAuth, like],
    unlike:[jwtAuth, unlike],
    create: [
        jwtAuth,
        doParamsExist,
        isTitleValid,
        isContentValid,
        create
    ]
}