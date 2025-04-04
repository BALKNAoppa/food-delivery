"use client";

import { useEffect, useState } from "react";
import { getFood } from "@/utils/getFoods";
import { FoodCards } from "./foodCard";
// import { useCart } from "@/hooks/orders-provider";

export type Food = {
  _id: string;
  foodName: string;
  category: { _id: string; categoryName: string }[];
  price: number;
  imageUrl: string;
  description: string;
  image: string;
};

export function FoodCart() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [orders, setOrders] = useState<Food[]>([]);

  //Fetching food data from the API
  const fetchFood = async () => {
    try {
      setLoading(true);
      setError(null);
      const foodList = await getFood("food");
      if (Array.isArray(foodList)) {
        setFoods(foodList);
      } else {
        throw new Error("Invalid food data format");
      }
    } catch {
      setError("Failed to fetch food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  // Grouping food items by category
  const groupedFoods = foods.reduce(
    (acc: { [key: string]: Food[] }, foodItem) => {
      const categoryName =
        foodItem.category.length > 0
          ? foodItem.category[0].categoryName
          : "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(foodItem);
      return acc;
    },
    {}
  );

  // Calculate total price for all selected items
  // const totalPrice = Object.keys(quantities).reduce((total, id) => {
  //   const foodItem = foods.find((food) => food._id === id);
  //   return total + (foodItem ? foodItem.price * quantities[id] : 0);
  // }, 0);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {Object.entries(groupedFoods).map(([category, groupedFood]) => (
            <FoodCards
              key={category}
              category={category}
              groupedFood={groupedFood}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default FoodCart;
