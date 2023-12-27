import { type Knex } from 'knex';

const tableName = 'users';
const usersData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password_1',
    role: 'user',
    created_at: '2023-12-09T09:05:20.986Z',
    updated_at: null
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'hashed_password_2',
    role: 'admin',
    created_at: '2023-12-09T09:05:20.986Z',
    updated_at: null
  }
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert(usersData);
}
