import axios from 'axios';
import { useEffect, useState } from 'react';
import SeatGrid from '../components/SeatGrid';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [seats, setSeats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSeats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const res = await axios.get('http://localhost:5000/api/seats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeats(res.data);
    };
    fetchSeats();
  }, []);

  return (
    <div>
      <h2>Train Seat Booking</h2>
      <SeatGrid seats={seats} setSeats={setSeats} />
    </div>
  );
}
