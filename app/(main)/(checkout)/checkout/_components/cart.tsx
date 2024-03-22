/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/use-cart";
import { formatPrice, price } from "@/lib/format-price";
import { Voucher } from "@/types";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface CartProp {
  ship: boolean;
  totalPrice: number;
  priceShip: number;
  setCode: Dispatch<SetStateAction<string>>;
  voucher: Voucher | null;
  error: string;
  handlerFindVoucher: () => void;
  setVoucher: Dispatch<SetStateAction<Voucher | null>>;
}

export const Cart = ({
  ship,
  totalPrice,
  priceShip,
  error,
  handlerFindVoucher,
  voucher,
  setCode,
  setVoucher,
}: CartProp) => {
  const cart = useCart();

  const finalPrice = voucher?.discount
    ? totalPrice - voucher.discount * 1000
    : totalPrice;

  const finalPriceShipping = voucher?.discount
    ? priceShip - voucher.discount * 1000
    : priceShip;

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

      {voucher ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3837/3837136.png"
              alt="voucher"
              className="w-14 h-14"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {voucher.name} {voucher.title}
              </span>
              <span className="text-[12px] tracking-tighter">
                {voucher.code} - Hạn sử dụng:{" "}
                {format(voucher.shelfLife, "dd/MM/yyyy")}
              </span>
            </div>
          </div>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => {
              setVoucher(null);
              setCode("");
            }}
          >
            <Trash />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between space-x-3">
            <Input
              placeholder="Mã giảm giá"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button onClick={handlerFindVoucher}>Xác nhận</Button>
          </div>
          {error && (
            <p className="text-destructive text-sm font-medium">{error}</p>
          )}
        </div>
      )}
      <Separator className="mb-8 mt-4" />

      <div className="flex items-center justify-between w-full">
        <p className="text-neutral-600">Tổng cộng</p>

        <div className="flex items-center space-x-2">
          <span>VND</span>
          <p className="text-xl font-semibold">
            {price(!ship ? finalPrice : finalPriceShipping)}₫
          </p>
        </div>
      </div>
    </div>
  );
};
