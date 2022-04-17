const knex = require('../db/connection');

const list = () => knex('posts').select('*');

function read (postId)  {
    return knex('posts')
        .select('*')
        .where('id', '=', postId);
}

function create (post) {
    return knex('posts')
        .insert(post, 'id');
}


module.exports = {
    list,read,create
}