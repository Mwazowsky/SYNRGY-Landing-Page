exports.seed = function(knex) {
    return knex('books').insert([
      {
        title: "Buku 1",
        author: "ABC",
        isbn: "ABC1234",
        publish_year: 2021,
        genre: "Sci-Fi",
        picture: " http://res.cloudinary.com/ddpriosuk/image/upload/v1699422158/djzviwbynjgwd8kxipkf.png"
      },
      // Add more rows as needed
    ]);
  };
  