exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('isbn').notNullable();
        table.integer('published_year').notNullable();
        table.string('genre').notNullable();
        table.integer('copies_available').notNullable();
        table.integer('total_copies').notNullable();
        table.string('picture').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('books');
};
