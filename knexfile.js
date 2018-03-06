require('dotenv').config();

const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

  development: {
    migrations: { tableName: 'knex_migrations' },
    client: 'pg',
    connection: process.env.DATABASE_URL,
  }
};
