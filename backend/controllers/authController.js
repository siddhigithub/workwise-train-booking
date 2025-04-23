
const bcrypt = require('bcryptjs'); // using bcryptjs for compatibility
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, hashedPassword);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Username already exists or invalid data' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
