
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").unique().notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("picture").notNullable();
      table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
