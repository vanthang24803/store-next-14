"use client";

import { Product } from "@/types";
import { CardItem } from "@/components/card-item";

export const ProductSearch = ({ products }: { products: Product[] | null }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5">
      {products?.map((item, index) => (
        <CardItem product={item} key={index} />
      ))}
    </div>
  );
};
