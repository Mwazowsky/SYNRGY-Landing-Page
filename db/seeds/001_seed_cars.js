exports.seed = function(knex) {
    return knex('cars').insert([
      {
        car_name: 'Toyota Camry',
        rate: 50.00,
        capacity: 5,
        picture: 'toyota.jpg',
      },
      {
        car_name: 'Honda Civic',
        rate: 45.00,
        capacity: 5,
        picture: 'honda.jpg',
      },
      // Add more rows as needed
    ]);
  };
  