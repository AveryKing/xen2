/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 const testUserData = require('../config/testUserData');
 exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert(testUserData);
};
