const pool = require('../config/db');
const Seat = require('../models/seatModel');

exports.getSeats = async (req, res) => {
  try {
    const seats = await Seat.getAllSeats();
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch seats' });
  }
};

exports.bookSeats = async (req, res) => {
  const { seats } = req.body;
  const userId = req.user.id;

  if (!seats || seats.length === 0 || seats.length > 7) {
    return res.status(400).json({ message: "Select 1–7 seats" });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const locked = await Seat.lockSeatsForUpdate(client, seats);
    const alreadyBooked = locked.rows.filter(seat => seat.is_booked);

    if (alreadyBooked.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: "Some seats already booked" });
    }

    await Seat.markSeatsAsBooked(client, seats, userId);
    await client.query('COMMIT');

    const updated = await Seat.getAllSeats();
    res.json(updated);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  } finally {
    client.release();
  }
};
