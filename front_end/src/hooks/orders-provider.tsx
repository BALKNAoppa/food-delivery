"use client";

import { Food } from "@/components/foodcart/foodCart";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = Food & {
  quantity: number;
};

type CartMap = {
  [id: string]: CartItem;
};

type CartType = {
  cart: CartMap;
  addToCart: (food: Food, quantity: number) => void;
  updateQuantity: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartType>({} as CartType);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartMap>({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food: Food, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [food._id]: { ...food, quantity },
    }));
  };
  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
  
      const newQty = item.quantity + amount;
      if (newQty < 1) {
        return prev;
      }
      return {
        ...prev,
        [id]: { ...item, quantity: newQty },
      };
    });
  };
  

  const removeItem = (id: string) => {
    setCart((prev) => {
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);