const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

// Retrieves all users from database
const list = () => {
    return knex('users').select('*');
}

// Inserts new user into database
const create =  (user) => {
     hashPassword(user.password)
        .then(hash => {
            user.password = hash;
        })
    return knex('users').insert(user, 'id');
}

const validatePassword =  (plaintext, hash) => {
    return bcrypt.compare(plaintext, hash);
}
const hashPassword =  (password) => {
    return bcrypt.hash(password, 10)
}
// Retrieves a user's data from database
const read = (id) => {
    return knex('users')
        .select('*')
        .where('id', '=', id);
}

const isUsernameTaken = (username) => {
    return knex('users').select('id')
        .where('username', '=', username).length === 0
}
module.exports = {
    list,
    create,
    isUsernameTaken,
    read
}