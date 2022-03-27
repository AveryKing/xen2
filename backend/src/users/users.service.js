const knex = require('../db/connection');

// Retrieves all users from database
const list = () => {
    return knex('users').select('*');
}

// Inserts new user into database
const create = (user) => {
    return knex('users').insert(user);
}

// Retrieves a user's data from database
const read = (id) => {
    return knex('users')
        .select('*')
        .where('id','=',id);
}

module.exports = {
    list,
    create,
    read
}