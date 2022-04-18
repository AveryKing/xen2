
exports.up = function(knex) {
    return knex.schema.createTable("comments", (table) => {
        table.increments("id").primary();
        table.integer("post").references("id").inTable("posts").notNullable();
        table.integer("creator").references("id").inTable("users").notNullable();
        table.string("content").notNullable();
        table.specificType('likes', 'INT[]');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
