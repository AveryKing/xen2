const jwtAuth = require("../auth/jwtAuth");
const service = require("./comments.service");

function validateParams(req, res, next) {
    if (!req.body.data.hasOwnProperty('content')) {
        return next({
            status: 400,
            message: 'You cannot post an empty comment'
        })
    }

    return next();
}

function validateLength(req, res, next) {
    if (req.body.data.content.length < 5) {
        return next({
            status: 400,
            message: 'Comment must be at least 5 characters'
        })
    } else {
        next();
    }
}


function create(req, res, next) {
    const newComment = {
        creator: req.user.id,
        post: req.params.postId,
        ...req.body.data
    }

    service.create(newComment)
        .then(comment => res.status(201).json({comment}))
        .catch((err) => {
            console.log(err)
            next({
                status: 500,
                message: 'Comment could not be created'
            })
        });
}

function list(req, res, next) {
    service.list(req.params.postId)
        .then(comments => res.json({comments}))
        .catch(() => {
            next({
                status: 500,
                message: 'There was an error while fetching comments'
            })
        })

}

function read(req, res, next) {
    service.read(req.params.commentId)
        .then(comment => {
            if (comment) {
                res.json({comment})
            } else {
                next({
                    status: 404,
                    message: 'Comment not found'
                })
            }
        })
        .catch((err) => {
            console.error(err);
            return next({
                status: 500,
                message: 'There was an error while fetching the comment'
            })
        })
}

function remove(req, res, next) {

}

module.exports = {
    create: [jwtAuth, validateParams, validateLength, create],
    remove: [jwtAuth, remove],
    list,
    read
}