import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getFood } from "@/utils/getFoods";
import { log } from "console";

type Food = {
  _id: string;
  foodName: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
};

export function FoodCart() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFood = async () => {
    try {
      setLoading(true);
      setError(null);
      const foodList = await getFood("food");
      console.log("TEST", foodList );
      if (Array.isArray(foodList)) {
        setFoods(foodList);
      } else {
        throw new Error("Invalid food data format");
      }
    } catch (error) {
      setError("Failed to fetch food items.");
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const groupedFoods = foods.reduce((acc: { [key: string]: Food[] }, foodItem) => {
    if (!acc[foodItem.category]) {
      acc[foodItem.category] = [];
    }
    acc[foodItem.category].push(foodItem);
    return acc;
  }, {});

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        Object.keys(groupedFoods).map((category) => (
          <div key={category}>
            <h2 className="mt-14 mb-14 text-3xl font-semibold leading-[36px] tracking-[-2.5%]">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {groupedFoods[category].map((foodItem) => (
                <div key={foodItem._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <img src={foodItem.imageUrl} alt={foodItem.foodName} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-red-600">{foodItem.foodName}</h3>
                    <p className="text-gray-600">{foodItem.description}</p> {/* Displaying description here */}
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
        ))
      )}
    </div>
  );
}