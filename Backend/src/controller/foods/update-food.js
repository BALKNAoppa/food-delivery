// Inside update-food.js
import { FoodModel } from "../../modules/foodModel.js";

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params; // Get food ID from URL parameters
    const { foodName, price, image, ingredients, category, calories } = req.body; // Get updated data from request body

    // Validate input data
    if (!foodName && !price && !image && !ingredients && !category && !calories) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    // Find the food item by ID
    const foodItem = await FoodModel.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Update the fields
    foodItem.foodName = foodName || foodItem.foodName;
    foodItem.price = price || foodItem.price;
    foodItem.image = image || foodItem.image;
    foodItem.ingredients = ingredients || foodItem.ingredients;
    foodItem.category = category || foodItem.category;
    foodItem.calories = calories || foodItem.calories;

    // Save the updated food item
    await foodItem.save();

    // Respond with the updated food item
    res.json({ message: "Food item updated successfully", food: foodItem });
  } catch (err) {
    console.error("Error updating food item:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
