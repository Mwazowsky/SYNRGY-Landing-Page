exports.up = function (knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments('book_id').primary();
        table.string('title');
        table.string('author');
        table.string('isbn');
        table.integer('publish_year');
        table.text('genre');
        table.text('picture');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('cars');
};
