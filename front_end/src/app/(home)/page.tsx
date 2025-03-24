"use client"
import React from "react";
import { TopBanner } from "@/components/top_banner/TopBanner";
import { Category } from "@/components/category/Category";
import { FoodCart } from "@/components/foodcart/foodCart";

export default function Home() {
  return (
    <div className="w-screen">
      <TopBanner />
      <Category />
      <FoodCart />
    </div>
  );
} 