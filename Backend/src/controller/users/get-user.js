import { UserModel } from "../../modules/User.js";

export const getUsers = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(req.user)
    const users = await UserModel.findById(id);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.error("Mongo Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};