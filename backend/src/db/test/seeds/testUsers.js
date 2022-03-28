const testUserData = require('../config/testUserData');
exports.seed = async function(knex) {
  await knex('users').truncate();
  await knex('users').insert(testUserData);
};
