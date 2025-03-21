import { UserModel } from "../../modules/User.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, gender, username, password, email } = req.body;

    // Validation for required fields
    if (!firstName) {
      return res.status(400).json({ message: 'First name is required' });
    }
    if (!lastName) {
      return res.status(400).json({ message: 'Last name is required' });
    }
    if (!gender) {
      return res.status(400).json({ message: 'Gender is required' });
    }
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Create and save new user
    const newUser = new UserModel({
      firstName,
      lastName,
      gender,
      username,
      password,
      email,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
