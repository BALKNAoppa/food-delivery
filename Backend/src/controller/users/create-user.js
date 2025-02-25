import User from './src/models/User.js';

export const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Create user (MongoDB auto-generates `_id`)
    const newUser = new User({ username });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
