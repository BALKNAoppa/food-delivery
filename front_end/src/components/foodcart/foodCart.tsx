import { Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getFood } from "@/utils/getFoods";
import Image from "next/image";

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
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchFood();
  }, []);

  const groupedFoods = foods.reduce((acc: { [key: string]: Food[] }, foodItem) => {
    const categoryName = foodItem.category.length > 0 ? foodItem.category[0].categoryName : "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(foodItem);
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
          <div className="mt-6 mb-6" key={category}>
            <div className="flex items-center mt-10 mb-10 justify-between">
              <h2 className="text-3xl font-semibold">{category}</h2>
              <button
                onClick={() =>
                  setExpandedCategories((prev) => ({
                    ...prev,
                    [category]: !prev[category],
                  }))
                }
                className="text-sm font-medium text-primary underline-offset-4 hover:underline flex items-center"
              >
                {expandedCategories[category] ? "See less" : "See more"}
                <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
              {(expandedCategories[category] ? groupedFoods[category] : groupedFoods[category].slice(0, 3)).map((foodItem) => (
                <div key={foodItem._id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                  <Image src={foodItem.image} alt={foodItem.foodName} width={300} height={200} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-red-600">{foodItem.foodName}</h3>
                    {/* Description grows without affecting food cart height */}
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
        ))
      )}
    </div>
  );
}

export default FoodCart;