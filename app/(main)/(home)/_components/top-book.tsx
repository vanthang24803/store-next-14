"use client";

import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface TopBookProps {
  data: Product[] | undefined;
}

export const TopBook = ({ data }: TopBookProps) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-8 gap-4 hover:cursor-pointer overflow-hidden">
      {data?.slice(0,4).map((item) => (
        <Link href={`/products/${item.id}`} key={item.id}>
          <div className="md:w-full relative md:h-[40vh] h-[250px] " >
            <Image src={item.thumbnail}  alt={item.name} fill className="rounded-md over:scale-105 transform transition-transform duration-500" />
          </div>
        </Link>
      ))}
    </div>
  );
};

