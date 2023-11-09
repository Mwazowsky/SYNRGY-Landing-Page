exports.seed = function(knex) {
    return knex('transactions').insert([
      {
        renter_id: 1,
        car_id: 1,
        checkout_date: '2023-10-01',
        due_date: '2023-10-10',
        return_date: '2023-10-05',
        fine_amount: 10.00,
      },
      {
        renter_id: 2,
        car_id: 2,
        checkout_date: '2023-10-02',
        due_date: '2023-10-11',
        return_date: '2023-10-07',
        fine_amount: 15.00,
      },
      // Add more rows as needed
    ]);
  };
  