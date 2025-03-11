"use client";
import React, { useState, useEffect } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Header = () => {
  const { setTheme, theme } = useTheme();
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
        <Link
          href="/"
          className="flex items-center gap-x-2 text-indigo-700 cursor-pointer"
        >
          <h1 className="text-2xl font-bold">MovieZ</h1>
        </Link>
        <div className="relative hidden lg:flex items-center gap-x-3">
          <div className="w-[97px] h-[36px] max-lg:hidden"></div>
          <div className="w-[379px] h-[36px] max-lg:hidden">
            <div className="relative w-full">
              <Input
                placeholder="Search..."
                className="pl-10 pr-4 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Button className="w-9 h-9 lg:hidden" variant={"outline"}>
            <Search />
          </Button>
          <Button
            variant="outline"
            className="w-9 h-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;