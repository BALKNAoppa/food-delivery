import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: { type: [String] },
  category: { type: [mongoose.SchemaTypes.ObjectId], ref: "foodCategory" },
  calories: { type: Number },
  description: { type: String }
}, { timestamps: true });

const FoodModel = mongoose.model("Food", foodSchema);

export { FoodModel };
