exports.up = function (knex) {
    return knex.schema.createTable('cars', (table) => {
        table.increments('car_id').primary();
        table.string('car_name');
        table.float('rate');
        table.integer('capacity');
        table.text('picture');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('cars');
};
