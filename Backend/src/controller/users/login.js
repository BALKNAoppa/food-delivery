import jwt from "jsonwebtoken";
import { UserModel } from "../../modules/User.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password)

    // Find user by username in MongoDB
    const user = await UserModel.findOne({ username });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username or Password did not match" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "uneheer nuuts",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};