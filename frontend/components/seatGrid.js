import axios from 'axios';
import { useState } from 'react';

export default function SeatGrid({ seats, setSeats }) {
  const [selected, setSelected] = useState([]);
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  const toggleSelect = (seatId) => {
    if (selected.includes(seatId)) {
      setSelected(selected.filter(id => id !== seatId));
    } else {
      if (selected.length < 7) {
        setSelected([...selected, seatId]);
      }
    }
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/seats/book', {
        seats: selected,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Seats booked!');
      setSeats(res.data); // Return updated seats
      setSelected([]);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 60px)', gap: '10px' }}>
        {seats.map(seat => (
          <div
            key={seat.id}
            onClick={() => !seat.is_booked && toggleSelect(seat.id)}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: seat.is_booked
                ? 'gray'
                : selected.includes(seat.id)
                  ? 'green'
                  : 'white',
              border: '1px solid black',
              textAlign: 'center',
              lineHeight: '50px',
              cursor: seat.is_booked ? 'not-allowed' : 'pointer',
            }}
          >
            {seat.seat_number}
          </div>
        ))}
      </div>
      <button onClick={handleBooking} disabled={selected.length === 0}>
        Book Selected Seats ({selected.length})
      </button>
    </div>
  );
}
