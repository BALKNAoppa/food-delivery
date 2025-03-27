"use client";

import { useEffect, useState } from "react";
import { getFood } from "@/utils/getFoods";
import Image from "next/image";
import { Plus } from "lucide-react";

type Food = {
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
  const [categoryIdToShow, setCategoryIdToShow] = useState<string | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        setError(null);
        const foodList = await getFood("food");
        if (Array.isArray(foodList)) {
          setFoods(foodList);

          // Set "Pizza" as the default category if it exists
          const pizzaCategory = foodList.find(
            (foodItem) =>
              foodItem.category.some((category) => category.categoryName.toLowerCase() === "pizza")
          );
          if (pizzaCategory) {
            setCategoryIdToShow("Pizza");
          }
        } else {
          throw new Error("Invalid food data format");
        }
      } catch {
        setError("Failed to fetch food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, []);

  // Group foods by category
  const groupedFoods = foods.reduce((acc: { [key: string]: Food[] }, foodItem) => {
    const categoryName = foodItem.category.length > 0 ? foodItem.category[0].categoryName : "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(foodItem);
    return acc;
  }, {});

  // Handle category click
  const handleCategoryClick = (categoryName: string) => {
    setCategoryIdToShow(categoryName);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Category List */}
          <div className="flex space-x-4 mt-4 mb-6">
            {Object.keys(groupedFoods).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-lg font-semibold ${categoryIdToShow === category ? "text-red-600" : "text-gray-600"}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Display Food Items of the Selected Category */}
          {categoryIdToShow && groupedFoods[categoryIdToShow] && (
            <div className="mt-6 mb-6">
              <h2 className="text-3xl font-semibold">{categoryIdToShow}</h2> {/* Category name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
                {groupedFoods[categoryIdToShow].map((foodItem) => (
                  <div key={foodItem._id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                    <Image src={foodItem.image} alt={foodItem.foodName} width={300} height={200} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-red-600">{foodItem.foodName}</h3>
                      <p className="text-gray-600 text-sm justify text-justify max-h-12 overflow-hidden group-hover:max-h-[5rem] group-hover:overflow-visible transition-all duration-500 ease-in-out">
                        {foodItem.description}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-gray-800 font-bold">${foodItem.price.toFixed(2)}</span>
                        <button className="bg-red-500 text-white p-2 rounded-full">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FoodCart;