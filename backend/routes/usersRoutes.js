// routes/usersRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// (Optional) Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
