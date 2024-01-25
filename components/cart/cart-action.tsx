/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CartIcon } from "@/components/icons/icon-cart";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { UpdateCart } from "./update-cart";
import { formatPrice, price } from "@/lib/format-price";
import { useRouter } from "next/navigation";

export const CartAction = () => {
  const cart = useCart();

  const totalPrice = cart.items.reduce((total, item) => {
    return (
      total +
      (item.product.options[0].price -
        (item.product.options[0].price * item.product.options[0].sale) / 100) *
        item.quantity
    );
  }, 0);

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <div className="relative">
            <CartIcon />
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
              <span className="text-white text-[12px]">
                {cart.items.length}
              </span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Giỏ Hàng </SheetTitle>
          <SheetDescription>
            Số sản phẩm trong giỏ hàng: {cart.items.length}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <ScrollArea className="lg:h-[75vh] h-[78vh] w-full ">
            <div className="flex flex-col space-y-4 my-4">
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.product.thumbnail}
                      alt="thumbnail"
                      className="w-[20%] object-cover"
                      onClick={() =>
                        router.push(`/products/${item.product.id}`)
                      }
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-5">
                        <span
                          className="font-semibold line-clamp-2"
                          onClick={() =>
                            router.push(`/products/${item.product.id}`)
                          }
                        >
                          {item.product.name}
                        </span>
                        <X
                          className="w-4 h-4"
                          onClick={() =>
                            cart.removeItem(
                              item.product.id,
                              item.product.options[0].id
                            )
                          }
                        />
                      </div>
                      <span className="text-neutral-400 text-[12px]">
                        {item.product.options[0].name}
                      </span>
                      <div className="flex items-center justify-between my-2">
                        <UpdateCart
                          productId={item.product.id}
                          optionId={item.product.options[0].id}
                          quantity={item.quantity}
                        />

                        <div className="flex items-center space-x-2">
                          <span className="font-semibold ">
                            {formatPrice(
                              item.product.options[0].price,
                              item.product.options[0].sale
                            )}
                            ₫
                          </span>

                          <span className="text-[12px] line-through hidden md:block">
                            {price(item.product.options[0].price)}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold uppercase">Tổng tiền:</span>
            <span className="font-medium">
              {totalPrice.toLocaleString("de-DE")}₫
            </span>
          </div>
          <Button
            className="w-full bg-[#417505] hover:bg-[#65b10d]"
            onClick={() => router.push("/checkout")}
          >
            Thanh toán
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
