"use client";

import useCart from "@/hooks/use-cart";
import { Button } from "../ui/button";
import { useState } from "react";

interface UpdateCart {
  productId: string;
  optionId: string;
  quantity: number;
}

export const UpdateCart = ({ productId, optionId, quantity }: UpdateCart) => {
  const cart = useCart();

  const [total, setTotal] = useState(quantity);

  const handleMinus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal > 0 ? prevTotal - 1 : 0;
      if (newTotal < 1) {
        cart.removeItem(productId, optionId);
      } else {
        cart.updateItemQuantity(productId, optionId, newTotal);
      }
      return newTotal;
    });
  };

  const handlePlus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal + 1;
      cart.updateItemQuantity(productId, optionId, newTotal);
      return newTotal;
    });
  };

  return (
    <div className="flex space-x-2 items-center">
      <Button className="w-8 h-8" variant="outline" onClick={handleMinus}>
        -
      </Button>

      <Button disabled className="w-8 h-8" variant="ghost">
        {total}
      </Button>

      <Button className="w-8 h-8" variant="outline" onClick={handlePlus}>
        +
      </Button>
    </div>
  );
};
