/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {id: 1, creator: 1, title: 'First Post', content: 'This is the first post'},
    {id: 2, creator: 1, title: 'Second Post', content: 'This is the second post'},
    {id: 3, creator: 1, title: 'Third Post', content: 'This is the third post'}
  ]);
};
