import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.LIGHTNOVEL.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.LIGHTNOVEL.name}
      thumbnail={Collections.LIGHTNOVEL.thumbnail}
      category={Collections.LIGHTNOVEL.name}
    />
  );
}
