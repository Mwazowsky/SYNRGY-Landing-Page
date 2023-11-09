module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'bcr_db',
            user: 'postgres',
            password: 'postgres'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds`
        }
    }
};