import { FoodModel } from "../../modules/foodModel.js";

export const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted successfully", data: deletedFood });
  } catch (err) {
    console.error("Error in deleteFood:", err);
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
};
