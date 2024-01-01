const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
    if (err) {
    console.log(err);
  } else {
    console.log("Connected to postgres database!");
  }
});

module.exports = pool;