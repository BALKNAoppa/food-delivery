import mongoose from "mongoose";

const FoodCategorySchema = mongoose.Schema({
    categoryName: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: Date.now },
});

export const FoodCategoryModel = mongoose.models['foodCategory'] || mongoose.model('foodCategory', FoodCategorySchema);
