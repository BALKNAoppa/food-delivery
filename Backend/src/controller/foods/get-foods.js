import { FoodModel } from "../../modules/foodModel.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate({
      path: "category",
      select: "categoryName",
    });

    console.log("Foods from database:", foods);

    const formattedFoods = foods.map((food) => ({
      _id: food._id,
      foodName: food.foodName,
      price: food.price,
      image: food.image,
      ingredients: food.ingredients,
      category: food.category,
      calories: food.calories,
      description: food.description,
    }));

    res.json({ message: "success", data: formattedFoods });
  } catch (err) {
    console.error("Error in getFoods:", err);
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
};