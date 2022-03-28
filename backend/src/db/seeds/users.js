/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').truncate();
  await knex('users').insert([
    { username:'john', email: 'john@gmail.com',password:'john' },
    { username:'thomas', email: 'thomas@gmail.com',password:'thomas' },
    { username:'molly', email: 'molly@gmail.com',password:'molly' },
  ]);
};
