exports.up = function (knex) {
    return knex.schema.createTable('renters', (table) => {
        table.increments('renter_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('phone');
        table.text('address');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('renters');
};
