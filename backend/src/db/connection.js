require('dotenv').config();

const environment = process.env.MODE;
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;