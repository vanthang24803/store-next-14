"use client";

import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface TopBookProps {
  data: Product[] | undefined;
}

export const TopBook = ({ data }: TopBookProps) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-8 px-2 gap-4 hover:cursor-pointer overflow-hidden">
      {data?.slice(0, 4).map((item) => (
        <Link href={`/products/${item.id}`} key={item.id}>
          <div className="md:w-full relative md:h-[38vh] h-[220px] ">
            <Image
              src={item.thumbnail}
              alt={item.name}
              title={item.name}
              fill
              sizes="(max-width: 640px) 100px, (max-width: 768px) 200px, 300px"
              priority={true}
              className="rounded-md over:scale-105 transform transition-transform duration-500"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
