const knex = require('../db/connection');

// Retrieves all users from database
const list = () => {
    return knex('users').select('*');
}

// Inserts new user into database
const create = () => {
    return knex('users').insert({
        username:'test',
        email:'test',
        password:'test'
    });
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