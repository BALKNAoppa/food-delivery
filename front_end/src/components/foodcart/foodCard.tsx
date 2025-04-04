import { useState } from "react";
import { Food } from "./foodCart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/orders-provider";

type FoodCardsProps = {
  category: string;
  groupedFood: Food[];
};

export const FoodCards = (props: FoodCardsProps) => {
  const { category, groupedFood } = props;
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className="mt-6 mb-6">
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
        {(expandedCategories[category]
          ? groupedFood
          : groupedFood.slice(0, 3)
        ).map((foodItem) => (
          <FoodCard {...foodItem} key={foodItem._id} />
        ))}
      </div>
    </div>
  );
};

const FoodCard = (foodItem: Food) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  // Handling quantity increase
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  // Handling quantity decrease
  const decreaseQuantity = () => setQuantity((prev) => prev - 1);
  if (quantity < 1) setQuantity(1);
  // Handle adding food item to the cart
  const handleOrderClick = () => {
    addToCart(foodItem, quantity);
    // setOrders((prev) => [...prev, foodItem]);
    // setQuantities((prev) => ({ ...prev, [foodItem._id]: 1 }));
  };

  return (
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
          {/* Animated price change */}
          <span className="text-gray-800 font-bold transition-all duration-300 ease-in-out">
            ${(foodItem.price * quantity).toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              onClick={decreaseQuantity}
              className="bg-gray-300 text-black p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-400 hover:scale-105"
            >
              <Minus size={16} />
            </Button>
            <span className="text-lg font-semibold">{quantity}</span>
            <Button
              onClick={increaseQuantity}
              className="bg-gray-300 text-black p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-400 hover:scale-105"
            >
              <Plus size={16} />
            </Button>
            <Button className="bg-red-500 text-white p-2 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-105">
              <span className="text-center w-full" onClick={handleOrderClick}>
                Add to Cart
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
