"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
  addToCart: (_id: string, _quantity: number) => void;
  cart: object;
};

const CartContext = createContext<CartType>({} as CartType);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem("cart") || "{}");
  });

  const addToCart = (id: string, quantity: number) => {
    localStorage.setItem("cart", JSON.stringify({ ...cart, [id]: quantity }));
    setCart({ ...cart, [id]: { quantity } });
  };

  return (
    <CartContext.Provider value={{ addToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
