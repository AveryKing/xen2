/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const testUserData = require('../config/testUserData');
 exports.seed = async function(knex) {
  await knex('users').insert(testUserData);
};
