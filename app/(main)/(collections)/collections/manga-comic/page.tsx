import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.MANGA.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.MANGA.name}
      thumbnail={Collections.MANGA.thumbnail}
      category={Collections.MANGA.name}
    />
  );
}
