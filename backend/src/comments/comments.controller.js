const jwtAuth = require("../auth/jwtAuth");
const service = require("./comments.service");

function create(req,res,next) {

}

function list(req,res,next) {
    service.list(req.params.postId)
        .then(comments => res.json({comments}))
        .catch(() => {
            next({
                status:500,
                message:'There was an error while fetching comments'
            })
        })

}

function read(req,res,next) {
    service.read(req.params.commentId)
        .then(comment => res.json({comment}))
        .catch(() => {
            next({
                status:500,
                message:'There was an error while fetching the comment'
            })
        })
}

function remove(req,res,next) {

}

module.exports = {
    create:[jwtAuth,create],
    remove:[jwtAuth,remove],
    list,
    read
}