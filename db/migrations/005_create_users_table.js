exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('password');
        table.string('token');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
