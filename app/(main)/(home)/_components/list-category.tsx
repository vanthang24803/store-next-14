/* eslint-disable @next/next/no-img-element */
"use client";

import { CardItemSmall } from "@/components/card-small-item";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListCategoryProps {
  name: string;
  thumbnail: string;
  products: Product[];
  link: string;
}

export const ListCategory = ({
  name,
  thumbnail,
  products,
  link,
}: ListCategoryProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 py-4">
      <h2 className="text-2xl font-bold mx-2">{name}</h2>
      <div className="flex justify-between lg:space-x-4">
        <Link href={link} className="lg:block hidden w-1/5">
          <img src={thumbnail} alt={name} />
        </Link>
        <div className="lg:w-4/5 flex flex-col space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-1.5">
            {products.slice(0, 10).map((item, index) => (
              <CardItemSmall key={index} product={item} />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="px-20 hover:text-white hover:bg-[#65b10d] font-medium"
              onClick={() => router.push(link)}
            >
              Xem tất cả
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
