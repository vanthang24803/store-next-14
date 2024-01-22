/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCart from "@/hooks/use-cart";
import { formatPrice, price } from "@/lib/format-price";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Prop {
  ship: boolean;
  totalPrice: number;
  priceShip: number;
}

export const MobileCart = ({ ship, totalPrice, priceShip }: Prop) => {
  const cart = useCart();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-full flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <ShoppingCart />
              <span className="md:block hidden">
                Hiển thị thông tin đơn hàng
              </span>
            </div>
            {ship ? (
              <span>{price(priceShip)}₫</span>
            ) : (
              <span>{price(totalPrice)}₫</span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="flex flex-col max-h-[50vh]">
            {cart.items.map((item, index) => (
              <Link
                href={`/products/${item.product.id}`}
                key={index}
                target="_blank"
                className="flex items-center space-x-4 mb-4"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-[15%] md:w-[12%] relative"
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col text-sm">
                    <span>{item.product.name}</span>
                    <span className="text-xs text-neutral-500">
                      {item.product.options[0].name}
                    </span>
                    <span className=" text-neutral-700">x{item.quantity}</span>
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
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
