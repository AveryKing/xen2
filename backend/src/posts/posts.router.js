const router = require('express').Router({mergeParams: true});
const controller = require('./posts.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route('/:postId')
    .get(controller.read)
    .all(methodNotAllowed);

router.route('/:postId/like')
    .post(controller.like)
    .delete(controller.unlike)
    .all(methodNotAllowed);

module.exports = router;