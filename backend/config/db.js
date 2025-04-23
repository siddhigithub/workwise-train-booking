const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.postgres,
  host: process.env.5432,
  database: process.env.train_booking,
  password: process.Siddhi@123,
  port: 5432,
});

module.exports = pool;
