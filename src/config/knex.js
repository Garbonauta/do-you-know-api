const pg = require('pg');
pg.defaults.ssl = true;

export default require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})
