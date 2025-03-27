import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCategory = async () => {
    try {
      const categoryList = await getCategory("category");
      console.log("categoryList", categoryList);

      if (Array.isArray(categoryList)) {
        setCategory(categoryList);
      } else {
        console.error("Fetched data is not an array:", categoryList);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-4">
      <div className="flex items-center justify-start mb-6">
        <h2 className="font-semibold text-[30px] leading-[36px] tracking-[-0.025em]">Categories</h2>
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          category.length > 0 ? (
            category.map((categoryItem) => (
              <Button
                key={categoryItem._id}
                variant="outline"
                onClick={() => handleCategoryClick(categoryItem._id)} // Pass _id here
                className="px-6 py-3 text-lg rounded-full border-2 border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                {categoryItem.categoryName}
              </Button>
            ))
          ) : (
            <div>No categories available</div>
          )
        )}
      </div>
    </div>
  );
}