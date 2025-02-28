import { FoodCategoryModel } from "../../modules/foodCategoryModel.js";

export const createCategory = async (req, res) => {
    const { categoryName } = req.body;

    try {
        await FoodCategoryModel.create({ categoryName });
        res.json({ message: 'Success' })
    } catch (err) {
        console.log("category err", err);
        res.status(403).json({ message: "Error occured" });
    }
}