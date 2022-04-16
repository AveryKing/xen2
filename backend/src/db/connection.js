require('dotenv').config();
const knex2 = require('knex');
const config = require('../../knexfile.js');
const knex = knex2(config.development);

module.exports = knex;