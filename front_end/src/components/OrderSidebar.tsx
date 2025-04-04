import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/orders-provider";
import Image from "next/image";

export const OrderSidebar = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const cartFoods = Object.entries(cart);

  const totalItems = cartFoods.reduce(
    (sum, [, food]) => sum + food.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="default"
          className="w-9 h-9 bg-red-500 rounded-full relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 text-xs font-semibold text-white bg-black rounded-full w-3 h-3 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 w-full max-w-sm">
        <SheetHeader className="flex justify-between p-0">
          <SheetTitle className="text-2xl mb-2.5">Захиалга</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-scroll h-screen">
          {cartFoods.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-20">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-lg font-semibold">Хоол захиалагдаагүй байна</p>
              <p className="text-sm">Та жагсаалтаас хоол нэмнэ үү</p>
            </div>
          ) : (
            <>
              {cartFoods.map(([id, food]) => (
                <div
                  key={id}
                  className="flex-shrink-0 group rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-full max-w-sm relative"
                >
                  <Image
                    src={food.image}
                    alt={food.foodName}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex align-center justify-between">
                      <h3 className="text-lg font-semibold text-red-600">
                        {food.foodName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-4 h-4 p-0"
                          onClick={() => updateQuantity(id, -1)}
                        >
                          <Minus className="w-2 h-2" />
                        </Button>
                        <span className="w-6 text-center">{food.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-4 h-4 p-0"
                          onClick={() => updateQuantity(id, 1)}
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                      <span className="font-semibold text-green-600">
                        Price: {(food.quantity * food.price)?.toLocaleString()}$
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 flex items-center gap-1 self-end"
                        onClick={() => removeItem(id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Устгах
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="default"
                className="border-box rounded-full hover:bg-red-500 hover:text-white bg-white text-red-500 border border-red-500 w-full h-9 flex items-center justify-center hover:scale-103 transition duration-300 ease-in-out"
              >
                Захиалах
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};