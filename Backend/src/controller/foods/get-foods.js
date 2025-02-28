import { FoodModel } from "../../modules/foodModel.js";

export const getFoods = async (req, res) => {
    try {
        const foods = await FoodModel.find().populate(['category'])

        res.json({ message: "success", data: foods })
    } catch (err) {
        res.status(403).json({ message: "Error occured" });
    }
}