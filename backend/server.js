const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// More routes for seat booking

app.listen(5000, () => console.log('Backend running on port 5000'));
