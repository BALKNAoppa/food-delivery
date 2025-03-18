"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, User, MapPin, ChevronRight } from "lucide-react";

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="inset-x-0 h-[59px] bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <h1 className="text-2xl font-bold">Logo will here</h1>
        </Link>
        <div className="flex items-center gap-x-3">
          <Button variant="outline" className="w-[251px] h-[36px] rounded-full">
            <MapPin className="w-5 h-5" color="red" />
            <span className="text-red-500 text text-xs font-normal leading-4 tracking-normal">
              Delivery address:
            </span>
            <span className="text text-xs font-normal leading-4 tracking-normal text-[#71717A]">
              Add location
            </span>
            <ChevronRight className="w-5 h-5" color="#71717A" />
          </Button>
          <Button variant="default" className="w-9 h-9 bg-red-500 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </Button>
          <Button variant="outline" className="w-25 h-9">
            <User className="w-6 h-6" />
            <span>Нэтрэх</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
