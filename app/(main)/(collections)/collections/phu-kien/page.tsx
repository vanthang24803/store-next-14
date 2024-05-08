import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.PHUKIEN.name,
};

export default function Selling() {
  return (
    <Products
      category={Collections.PHUKIEN.name}
      collection={Collections.PHUKIEN.name}
      thumbnail={Collections.PHUKIEN.thumbnail}
    />
  );
}
