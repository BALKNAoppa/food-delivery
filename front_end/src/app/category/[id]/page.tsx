"use client";

import { useEffect, useState } from "react";
import { getFood } from "@/utils/getFoods";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

type Food = {
  _id: string;
  foodName: string;
  category: { _id: string; categoryName: string }[];
  price: number;
  imageUrl: string;
  description: string;
  image: string;
};

interface FoodCartProps {
  categoryId: string | null;
}

export function FoodCart({ categoryId }: FoodCartProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Fetching food data from the API
  const fetchFood = async () => {
    try {
      setLoading(true);
      setError(null);
      const foodList = await getFood("food");
      if (Array.isArray(foodList)) {
        setFoods(foodList);
        setQuantities(
          foodList.reduce((acc, food) => {
            acc[food._id] = 1;
            return acc;
          }, {} as { [key: string]: number })
        );
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

  // Filter foods based on the selected category
  const filteredFoods = categoryId
    ? foods.filter(food =>
        food.category.some(cat => cat._id === categoryId)
      )
    : foods;

  // Handling quantity increase
  const increaseQuantity = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  // Handling quantity decrease
  const decreaseQuantity = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        // Rendering food cards based on filtered categories
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
          {filteredFoods.map((foodItem) => (
            <div
              key={foodItem._id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative group"
            >
              <Image
                src={foodItem.image}
                alt={foodItem.foodName}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col items-between">
                <h3 className="text-lg font-semibold text-red-600">
                  {foodItem.foodName}
                </h3>
                <p className="text-gray-600 text-sm justify text-justify max-h-12 overflow-hidden group-hover:max-h-[5rem] group-hover:overflow-visible transition-all duration-500 ease-in-out">
                  {foodItem.description}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-800 font-bold">
                    ${foodItem.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => decreaseQuantity(foodItem._id)}
                      className="bg-gray-300 text-black p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-400 hover:scale-105"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-semibold">
                      {quantities[foodItem._id]}
                    </span>
                    <Button
                      onClick={() => increaseQuantity(foodItem._id)}
                      className="bg-gray-300 text-black p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-400 hover:scale-105"
                    >
                      <Plus size={16} />
                    </Button>
                    <Button className="bg-red-500 text-white p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105">
                      <span className="text-center w-full">Add to Cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodCart;