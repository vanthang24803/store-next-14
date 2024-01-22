/* eslint-disable @next/next/no-img-element */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/use-cart";
import { formatPrice, price } from "@/lib/format-price";
import Link from "next/link";

interface CartProp {
  ship: boolean;
  totalPrice: number;
  priceShip: number;
}

export const Cart = ({ ship , totalPrice , priceShip }: CartProp) => {
  const cart = useCart();


  return (
    <div className="hidden lg:block w-full  bg-neutral-50 p-8">
      <ScrollArea className="max-h-svh">
        <div className="flex flex-col space-y-3 ">
          {cart.items.map((item, index) => (
            <Link
              href={`/products/${item.product.id}`}
              key={index}
              target="_blank"
              className="flex items-center space-x-2"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.name}
                className="w-[15%] relative"
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col text-sm">
                  <span>{item.product.name}</span>
                  <span className="text-xs text-neutral-500">
                    {item.product.options[0].name}
                  </span>
                  <span className="mt-2 text-neutral-700">
                    x{item.quantity}
                  </span>
                </div>

                <p className="text-[12px] text-neutral-700">
                  {formatPrice(
                    item.product.options[0].price,
                    item.product.options[0].sale
                  )}
                  ₫
                </p>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="my-4 flex flex-col space-y-6  w-full">
        <Separator />
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Tạm tính</span>
            <span className="text-sm font-medium">
              {totalPrice.toLocaleString("de-DE")}₫
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Phí vận chuyển</span>
            {ship ? (
              <span className="text-sm font-medium"> {price(35000)}₫ </span>
            ) : (
              <span> - </span>
            )}
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-neutral-600">Tổng cộng</p>

        <div className="flex items-center space-x-2">
          <span>VND</span>
          {ship ? (
            <p className="text-xl font-semibold">
              {price(priceShip)}₫
            </p>
          ) : (
            <p className="text-xl font-semibold">{price(totalPrice)}₫</p>
          )}
        </div>
      </div>
    </div>
  );
};
