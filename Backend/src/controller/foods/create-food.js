import { FoodModel } from "../../modules/foodModel.js";
import { FoodCategoryModel } from "../../modules/foodCategoryModel.js";

export const createFood = async (req, res) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    if (!foodName) {
      return res.status(400).json({ message: "foodName is required" });
    }
    if (!price) {
      return res.status(400).json({ message: "price is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }


    const existingCategory = await FoodCategoryModel.findOne({ _id: category });
    if (!existingCategory) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    await FoodModel.create({ foodName, price, image, ingredients, category });

    res.json({ message: "Food item added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
