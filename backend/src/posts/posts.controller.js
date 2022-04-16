const service = require('./posts.service');

const list = (req, res, next) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch((err) => {
            console.error(err);
            next({
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
            next({
                status: 500,
                message: 'There was an error retrieving this post from the database.'
            })
        })
}
module.exports = {
    list,read
}