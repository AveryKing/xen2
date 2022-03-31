const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

// Retrieves all users from database
const list = () => knex('users').select('*');

// Inserts new user into database
const create = async (user) => {
    await hashPassword(user.password)
        .then(hash => {
            user.password = hash;
        })
    return knex('users').insert(user, 'id');
}

const validatePassword = async (userId, plaintext) => {
    const res = await knex('users')
        .select('password')
        .where('id', '=', userId);
    return bcrypt.compare(plaintext, res[0].password);
}

const hashPassword = (password) => bcrypt.hash(password, 10)

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
    hashPassword,
    validatePassword,
    read
}