/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/icon-cart";
import { formatPrice, price } from "@/lib/format-price";
import { ItemModal } from "@/components/modal/item-modal";

interface CardItemProps {
  product: Product;
}

export const CardItemSmall = ({ product }: CardItemProps) => {
  return (
    <div className="w-full pb-2 bg-white rounded-md hover:shadow-md hover:cursor-pointer flex flex-col overflow-hidden group lg:max-h-[62vh]">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full object-fill rounded-md hover:scale-105 transform transition-transform duration-500 p-2 "
        />
        <ItemModal productId={product.id} />
      </div>
      <div className="flex flex-col px-4">
        <span className="text-neutral-500 font-medium text-sm">
          {product.brand}
        </span>
        <Link href={`/products/${product.id}`}>
          <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
        </Link>
        <span className="text-neutral-500 font-medium text-sm">
          {product.options.length} phiên bản
        </span>

        <div className="flex items-center justify-between py-1">
          {product.options[0].sale > 0 ? (
            <div className="flex flex-col">
              <span className="font-bold text-sm text-red-600">
                {formatPrice(product.options[0].price, product.options[0].sale)}
                ₫
              </span>
              <span className="text-sm line-through">
                {price(product.options[0].price)}₫
              </span>
            </div>
          ) : (
            <span className="text-sm font-medium">
              {price(product.options[0].price)}₫
            </span>
          )}

          {product.options[0].sale > 0 && (
            <Button size="sm" variant="destructive">
              -{product.options[0].sale}%
            </Button>
          )}
        </div>
        {product.options[0].quantity > 0 ? (
          <div className="my-1 flex items-center space-x-4">
            <div className="w-9 h-9 flex items-center justify-center bg-[#65b10d] rounded-full">
              <CartIcon />
            </div>
            <span className="font-semibold md:text-[12px] text-[10px] uppercase">
              Thêm vào giỏ
            </span>
          </div>
        ) : (
          <div className="my-2 flex items-center space-x-4">
            <div className="w-9 h-9 flex items-center justify-center bg-neutral-300/90 rounded-full cursor-not-allowed">
              <CartIcon />
            </div>
            <span className="font-semibold md:text-[12px] text-[10px] uppercase text-neutral-400 cursor-not-allowed">
              Hết hàng
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
