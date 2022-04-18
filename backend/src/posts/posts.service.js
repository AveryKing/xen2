const knex = require('../db/connection');

const list = () => knex('posts').select('*');

function read(postId) {
    return knex('posts')
        .select('*')
        .where('id', '=', postId);
}

function create(post) {
    return knex('posts')
        .insert(post, 'id');
}

async function like(postId, userId) {
    return knex('posts')
        .select('likes')
        .where('id', '=', postId)
        .then(likes => {
            if (likes[0].likes.includes(userId)) {
                return false;
            } else {
                return knex('posts')
                    .where('id', '=', postId)
                    .update({
                        likes: knex.raw('array_append(likes, ?)', userId)
                    }, 'likes');
            }
        });


}

async function unlike(postId, userId) {
    return knex('posts')
        .select('likes')
        .where('id', '=', postId)
        .then(likes => {
            if (!likes[0].likes.includes(userId)) {
                return false;
            } else {
                return knex('posts')
                    .where('id', '=', postId)
                    .update({
                        likes: knex.raw('array_remove(likes, ?)', userId)
                    }, 'likes');
            }
        });
}


module.exports = {
    list, read, create, like,unlike
}