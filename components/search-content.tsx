/* eslint-disable @next/next/no-img-element */
"use client";

import { formatPrice } from "@/lib/format-price";
import { Product } from "@/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export const SearchContent = ({
  content,
  product,
  search,
}: {
  content: string;
  search: string | null;
  product: Product[];
}) => {
  return (
    <div className="lg:w-[500px] md:w-[300px] lg:min-h-[20vh] min-h-[15vh]  rounded-md bg-white dark:bg-neutral-700/90  p-4 md:absolute md:top-12 md:-right-2 shadow-lg">
      <p className="text-sm font-medium">Gợi ý cho bạn:</p>
      {content != "" && (
        <div className="w-full h-auto my-2 text-sm flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            {product.slice(0, 5).map((item, index) => (
              <div className="flex flex-col space-y-2" key={index}>
                <Link
                  href={`/products/${item.id}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col space-y-1 ">
                    <span className="hover:text-[#65b10d] font-medium">
                      {item.name}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">
                        {item.options[0].price}₫
                      </span>
                      <span className="line-through text-neutral-500 text-xs">
                        {formatPrice(
                          item.options[0].price,
                          item.options[0].sale
                        )}
                        ₫
                      </span>
                    </div>
                  </div>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-[8%]"
                  />
                </Link>
                <Separator />
              </div>
            ))}
          </div>
          {product.length > 6 && (
            <Link
              href={`/search/?product=${search}`}
              className="flex items-center justify-center pt-1"
            >
              Xem thêm {product.length - 5} sản phẩm
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
