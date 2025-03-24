// Inside food-router.js
import express from "express";
import { authorizationMiddleware } from "../middleware/autho.js";
import { createFood } from "../controller/foods/create-food.js";
import { getFoods } from "../controller/foods/get-foods.js";
import { deleteFood } from "../controller/foods/delete-food.js";
import { updateFood } from "../controller/foods/update-food.js";

export const foodRouter = express.Router();

foodRouter.get("/", getFoods);
foodRouter.post("/createfood", authorizationMiddleware, createFood);
foodRouter.post("/delete", authorizationMiddleware, deleteFood);
foodRouter.put("/update/:id", authorizationMiddleware, updateFood);