import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { getCategory } from "@/utils/getCategory";
import { Button } from "../ui/button";

type Category = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export function Category() {
  const [category, setCategory] = useState<Category[]>([]);
  const router = useRouter(); // Initialize the router

  const fetchCategory = async () => {
    try {
      const categoryList = await getCategory("category");
      if (Array.isArray(categoryList)) {
        setCategory(categoryList);
      } else {
        console.error("Fetched data is not an array:", categoryList);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex items-center justify-start mb-6">
        <h2 className="font-semibold text-[30px] leading-[36px] tracking-[-0.025em]">Categories</h2>
      </div>

      {/* Centering the badges horizontally */}
      <div className="flex justify-center flex-wrap gap-4">
        {category.length > 0 ? (
          category.map((categoryItem) => (
            <Button
              key={categoryItem._id}
              variant="outline"
              onClick={() => handleCategoryClick(categoryItem.categoryName)}
              className="px-6 py-3 text-lg rounded-full border-2 border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              {categoryItem.categoryName}
            </Button>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
    </div>
  );
}
