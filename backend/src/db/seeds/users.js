/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    { username:'avery', email: 'kavery086@gmail.com',password:'DEBUG' },
  ]);
};
