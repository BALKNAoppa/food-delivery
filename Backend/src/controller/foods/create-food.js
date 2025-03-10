import mongoose from "mongoose";
import { FoodModel } from "../../modules/foodModel.js";
import { FoodCategoryModel } from "../../modules/foodCategoryModel.js";

export const createFood = async (req, res) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    if (!foodName) return res.status(400).json({ message: "foodName is required" });
    if (!price) return res.status(400).json({ message: "price is required" });
    if (!category) return res.status(400).json({ message: "category is required" });

    // Check if category ID is valid
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    const existingCategory = await FoodCategoryModel.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    // Check if food item already exists
    const existingFood = await FoodModel.findOne({ foodName });
    if (existingFood) {
      return res.status(400).json({ message: "Food item already exists" });
    }

    await FoodModel.create({ foodName, price, image, ingredients, category });

    res.json({ message: "Food item added successfully" });
  } catch (err) {
    console.error("Create Food Error:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
