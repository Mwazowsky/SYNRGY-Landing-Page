exports.seed = function(knex) {
    return knex('users').insert([
        {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            token: 'token123'
        },
        {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password: 'pass456',
            token: 'token456'
        },
    ]);
  };
  