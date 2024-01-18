/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { Product } from "@/types";
import Link from "next/link";

interface TopBookProps {
  data: Product[] | undefined;
}

export const TopBook = ({ data }: TopBookProps) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 hover:cursor-pointer overflow-hidden">
      {data?.map((item, index) => (
        <Link href={`/products/${item.id}`}>
          <img
            src={item.thumbnail}
            key={index}
            alt={item.name}
            className="w-full md:h-[40vh] object-cover rounded-md hover:scale-105 transform transition-transform duration-500"
          />
        </Link>
      ))}
    </div>
  );
};
