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

module.exports = {
    list,
    create
}