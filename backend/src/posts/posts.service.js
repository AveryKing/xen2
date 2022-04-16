const knex = require('../db/connection');

const list = () => knex('posts').select('*');

const read = (postId) => {
    return knex('posts')
        .select('*')
        .where('id', '=', postId);
}
module.exports = {
    list,read
}