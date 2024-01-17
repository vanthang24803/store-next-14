/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { categories } from "@/constant";

export const Navigation = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((item, index) => (
        <Link href={item.url} key={index} className="overflow-hidden rounded-md">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="rounded-md hover:scale-105 transform transition-transform duration-500"
          />
        </Link>
      ))}
    </div>
  );
};
