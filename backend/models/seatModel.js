const pool = require('../config/db');

const getAllSeats = async () => {
  const res = await pool.query('SELECT * FROM seats ORDER BY seat_number ASC');
  return res.rows;
};

const lockSeatsForUpdate = async (client, seatIds) => {
  return await client.query(
    'SELECT * FROM seats WHERE id = ANY($1::int[]) FOR UPDATE',
    [seatIds]
  );
};

const markSeatsAsBooked = async (client, seatIds, userId) => {
  for (const id of seatIds) {
    await client.query(
      'UPDATE seats SET is_booked = TRUE, user_id = $1 WHERE id = $2',
      [userId, id]
    );
  }
};

module.exports = {
  getAllSeats,
  lockSeatsForUpdate,
  markSeatsAsBooked
};
