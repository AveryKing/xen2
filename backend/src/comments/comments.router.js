const router = require('express').Router({mergeParams: true});
const controller = require('./comments.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:postId')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route('/:postId/:commentId')
    .get(controller.read)
    .delete(controller.remove)
    .all(methodNotAllowed);

module.exports = router;