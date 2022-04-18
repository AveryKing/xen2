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

async function toggleLike(liking, postId, userId) {
    return knex('posts')
        .select('likes')
        .where('id', '=', postId)
        .then(likes => {
            const oldLikes = likes[0].likes;
            if (liking ? oldLikes.includes(userId) : !oldLikes.includes(userId)) {
                return false;
            } else {
                return knex('posts')
                    .where('id', '=', postId)
                    .update({
                        likes: knex.raw(`array_${liking ? 'append' : 'remove'}(likes, ?)`, userId)
                    }, 'likes');
            }
        });

}

module.exports = {
    list, read, create, toggleLike
}