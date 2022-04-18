/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const testCommentData = require('../config/testCommentData.js');
exports.seed = async function(knex) {
  await knex('comments').insert(testCommentData)
};
