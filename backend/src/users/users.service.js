const knex = require('../db/connection');

const list = () => {
    return knex('users').select('*');
}

module.exports = {
    list
}