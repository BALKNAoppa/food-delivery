import { FoodCategoryModel } from "../../modules/foodCategoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await FoodCategoryModel.find();

        res.json({ message: "Success", data: categories });
    } catch (err) {
        console.log("Get categories error:", err);
        res.status(500).json({ message: "Error occurred while fetching categories" });
    }
};