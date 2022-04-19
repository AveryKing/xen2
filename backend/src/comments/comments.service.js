const knex = require('../db/connection');

function create(comment) {
  return knex('comments')
    .insert(comment, '*')
    .then(comment => comment[0]);
}

function list(postId) {
    return knex('comments')
        .select('*')
        .where('post', postId)
        .orderBy('created_at', 'desc')
        .then(comments => comments)
}

function read(commentId) {
    return knex('comments')
        .select('*')
        .where('id', commentId)
        .then(comment => {
            return comment.length ? comment[0] : false;
        })
}

function remove(commentId) {
    return knex('comments')
        .where('id', commentId)
        .delete();
}

module.exports = {
    create,
    list,
    read,
    remove
}