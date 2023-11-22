exports.seed = function (knex) {
    return knex('books').insert([
        {
            title: 'Book 1',
            author: 'Author 1',
            isbn: 'ISBN1',
            published_year: 2020,
            genre: 'Fiction',
            copies_available: 10,
            total_copies: 20,
            picture: 'image1.jpg'
        },
        {
            title: 'Book 2',
            author: 'Author 2',
            isbn: 'ISBN2',
            published_year: 2018,
            genre: 'Non-fiction',
            copies_available: 5,
            total_copies: 15,
            picture: 'image2.jpg'
        },
    ]);
};
