"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, User, MapPin, ChevronRight, Pizza } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="inset-x-0 h-[59px] bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <Link href="/" className="flex items-center gap-x-2 cursor-pointer">
          <Pizza className="w-9 h-9" />
          <h1 className="text-2xl font-bold">Logo will here</h1>
        </Link>

        <div className="flex items-center gap-x-3">
          {isLoggedIn && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="w-[251px] h-[36px] rounded-full"
                  >
                    <MapPin className="w-5 h-5" color="red" />
                    <span className="text-red-500 text-xs font-normal leading-4 tracking-normal">
                      Delivery address:
                    </span>
                    <span className="text-xs font-normal leading-4 tracking-normal text-[#71717A]">
                      Add location
                    </span>
                    <ChevronRight className="w-5 h-5" color="#71717A" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[251px] p-4 border border-gray-300 rounded-lg">
                  <DropdownMenuLabel className="flex items-start justify-start p-0">
                    Delivery address
                    </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="gap-2 flex flex-col">
                    <div>
                      <Input placeholder="City" />
                    </div>
                    <div>
                      <Input placeholder="District" />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet>
                <SheetTrigger>
                  <Button
                    variant="default"
                    className="w-9 h-9 bg-red-500 rounded-full"
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Захиалга</SheetTitle>
                    <SheetDescription>
                      <Button
                        variant="default"
                        className="border-box rounded-full hover:bg-red-500 hover:text-white bg-white text-red-500 border border-red-500 w-full h-9 flex items-center justify-center hover:scale-103 transition duration-300 ease-in-out"
                      >
                        Захиалах
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </>
          )}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="w-9 h-9 rounded-full">
                  <User className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 border border-gray-300 rounded-lg">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <p>Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="w-25 h-9">
                <User className="w-6 h-6" />
                <span>Нэвтрэх</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
