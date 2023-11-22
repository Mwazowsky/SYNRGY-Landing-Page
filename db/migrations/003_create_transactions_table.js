exports.up = function (knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('transaction_id').primary();
        table.integer('renter_id').unsigned();
        table.integer('car_id').unsigned();
        table.date('checkout_date');
        table.date('due_date');
        table.date('return_date');
        table.decimal('fine_amount', 10, 2);

        table.foreign('renter_id').references('renter_id').inTable('renters');
        table.foreign('car_id').references('car_id').inTable('cars');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('transactions');
};
