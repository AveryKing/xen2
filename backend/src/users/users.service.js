const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

// Retrieves all users from database
const list = () => {
    return knex('users').select('*');
}

// Inserts new user into database
const create = async (user) => {
    await hashPassword(user.password)
        .then(hash => {
            user.password = hash;
        })
    return knex('users').insert(user,'id');
}

const hashPassword = async (password) => {
    const salt = "testlol";
    return await bcrypt.hash(password, 10)
}
// Retrieves a user's data from database
const read = (id) => {
    return knex('users')
        .select('*')
        .where('id','=',id);
}

const isUsernameTaken = (username) => {
    return knex('users').select('id')
        .where('username','=', username).length === 0
}
module.exports = {
    list,
    create,
    isUsernameTaken,
    read
}