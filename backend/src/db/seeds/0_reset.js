/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
    await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE posts RESTART IDENTITY CASCADE')
    await knex.raw('TRUNCATE TABLE comments RESTART IDENTITY CASCADE')

};
