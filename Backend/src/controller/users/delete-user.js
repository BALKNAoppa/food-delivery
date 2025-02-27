import { UserModel } from "../../modules/User.js";

export const deleteUser = async (req, res) => {
    try {
        const { username } = req.body; // Get username from request body

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Find and delete the user in MongoDB by username
        const deletedUser = await UserModel.findOneAndDelete({ username });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
