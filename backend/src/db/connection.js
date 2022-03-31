require('dotenv').config();

const environment = "testing";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;