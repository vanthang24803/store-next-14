/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/icons/icon-cart";
import { formatPrice, price } from "@/utils/format-price";
import { ItemModal } from "@/components/modal/item-modal";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/utils/slug";

interface CardItemProps {
  product: Product;
}

export const CardItemSmall = ({ product }: CardItemProps) => {
  const cart = useCart();

  const router = useRouter();

  return (
    <div className="w-full pb-2 bg-white rounded-md hover:shadow-md hover:cursor-pointer flex flex-col overflow-hidden group lg:h-[50vh] md:h-[60vh] h-[52vh]  relative">
      <div className="relative h-[32vh] md:h-[46vh] lg:h-[28vh]">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="w-full object-contain rounded-md hover:scale-105 transform transition-transform duration-500 p-2 lg:max-h-[28vh] "
          title={product.name}
        />
        <ItemModal productId={product.id} />
        {!product.options[0].status && (
          <div className="absolute top-2 left-2  bg-neutral-800/80 rounded-md text-white flex items-center justify-center text-sm px-2 py-1">
            Hết hàng
          </div>
        )}
      </div>
      <div className="flex flex-col px-4">
        <span className="text-neutral-500 font-medium text-sm">
          {product.brand}
        </span>

        <p
          onClick={() => {
            router.push(`/products/${generateSlug(product.name, product.id)}`);
          }}
          className="font-semibold text-[13px] line-clamp-2"
        >
          {product.name}
        </p>
        <span className="text-neutral-500 text-[10px] font-medium text-sm">
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
          <div className="my-1 flex items-center space-x-4 absolute md:bottom-4 lg:bottom-0 bottom-1">
            <div
              className="w-9 h-9 flex items-center justify-center bg-[#65b10d] rounded-full"
              onClick={() => cart.addItem(product, 1)}
            >
              <CartIcon />
            </div>
            <span className="font-semibold text-[11px] uppercase">
              Thêm vào giỏ
            </span>
          </div>
        ) : (
          <div className="my-2 flex items-center space-x-4 absolute md:bottom-4 bottom-1">
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
