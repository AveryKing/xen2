require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: { directory: './src/db/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/db/test/migrations',
    },
    seeds: { directory: './src/db/test/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: { directory: './src/db/seeds' },
  },
};

