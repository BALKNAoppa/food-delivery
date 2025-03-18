import { FoodModel } from "../../modules/foodModel.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate("category");

    console.log("Foods from database:", foods); // ✅ Check raw data from DB

    const formattedFoods = foods.map((food) => ({
      _id: food._id,
      foodName: food.foodName,
      price: food.price,
      image: food.image,
      ingredients: food.ingredients,
      category: food.category.map((cur) => cur.categoryName),
    }));

    res.json({ message: "success", data: formattedFoods });
  } catch (err) {
    console.error("Error in getFoods:", err);
    res.status(500).json({ message: "Error occured", error: err.message });
  }
};
