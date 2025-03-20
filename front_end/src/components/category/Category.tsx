import * as React from "react";
import { useEffect, useState } from "react";
import { getCategory } from "@/utils/getCategory";
import { Badge } from "../ui/badge";
type Category = {
    id: number;
    name: string;
    image: string;
    category: string;
};

export function Category() {

  const [category, setCategory] = useState<Category[]>([]);

  const fetchCategory = async () => {
    const categoryList = await getCategory("category");
    setCategory(categoryList);
  };
  
  useEffect(() => {
   fetchCategory();
  }, []);
  

  return (
    <div className="flex justify-center items-center">
      <h2 className="font-semibold text-[30px] leading-[36px] tracking-[-0.025em]">Categories</h2>
      <Badge variant="outline">
      {category.map((category) => (
        <div key={category.id} className="category-item">
          <span>{category.name}</span>
        </div>
      ))}
      </Badge>
    </div>
  );
}
