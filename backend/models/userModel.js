const pool = require('../config/db');

const createUser = async (username, password) => {
  return await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );
};

const findUserByUsername = async (username) => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername
};
