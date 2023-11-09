exports.seed = function(knex) {
  return knex('renters').insert([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
    },
    {
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'alice@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
    },
    // Add more rows as needed
  ]);
};
