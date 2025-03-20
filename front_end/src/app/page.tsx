"use client"
import React from "react";
import { TopBanner } from "@/components/top_banner/TopBanner";
import { Category } from "@/components/category/Category";

export default function Home() {
  return (
    <div className="w-screen">
      <TopBanner />
      <Category />
    </div>
  );
} 