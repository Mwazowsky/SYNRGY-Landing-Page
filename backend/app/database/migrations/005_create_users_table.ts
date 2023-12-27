import { type Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('role');
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
