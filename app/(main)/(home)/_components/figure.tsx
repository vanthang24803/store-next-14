/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { PHUKIEN } from "@/constant";
import useFetch from "@/hooks/use-fetch";
import { price } from "@/lib/format-price";
import { Product } from "@/types";
import Link from "next/link";

export const Figure = () => {
  const { data: products, loading } = useFetch<Product[]>({
    url: `/api/product?Category=${PHUKIEN}`,
  });

  return (
    <div className="w-full max-h-[600px] bg-white rounded-md p-6">
      <Link href="/collections/phu-kien" className="text-lg font-bold">
        Phụ kiện
      </Link>

      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {products?.map((item) => (
            <div className="flex flex-col space-y-4" key={item.id}>
              <Link
                href={`/products/${item.id}`}
                className="flex space-x-4 text-sm"
              >
                <img
                  className="w-[80px] object-cover h-[80px]"
                  src={item.thumbnail}
                  alt={item.name}
                  title={item.name}
                />
                <div className="flex flex-col space-y-2">
                  <p className="text-[12.5px] line-clamp-1">{item.name}</p>
                  <b>{price(item.options[0].price)}₫</b>
                </div>
              </Link>
              <Separator />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
