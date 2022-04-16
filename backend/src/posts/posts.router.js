const router = require('express').Router({mergeParams: true});
const controller = require('./posts.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:postId')
  .get(controller.read)
  .all(methodNotAllowed);

router.route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;