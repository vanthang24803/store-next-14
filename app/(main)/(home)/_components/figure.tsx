"use client";

import { Separator } from "@/components/ui/separator";
import { PHUKIEN } from "@/constant";
import { price } from "@/lib/format-price";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Figure = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product?Category=${PHUKIEN}`
    );

    if (response.status == 200) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-h-[600px] bg-white rounded-md p-6">
      <Link href="/collections/phu-kien" className="text-lg font-bold">
        Phụ kiện
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {products?.map((item) => (
          <div className="flex flex-col space-y-4" key={item.id}>
            <Link href={`/products/${item.id}`} className="flex space-x-4 text-sm">
              <Image
                width={80}
                height={80}
                src={item.thumbnail}
                alt={item.name}
                title={item.name}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-[12.5px] line-clamp-2">{item.name}</p>
                <b>{price(item.options[0].price)}₫</b>
              </div>
            </Link>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};
