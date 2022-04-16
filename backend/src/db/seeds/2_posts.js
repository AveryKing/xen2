/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const testPostData = require('../config/testPostData.js');
exports.seed = async function(knex) {
  await knex('posts').del()
  await knex('posts').insert(testPostData)
};
