import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.KYNANG.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.KYNANG.name}
      thumbnail={Collections.KYNANG.thumbnail}
      category={Collections.KYNANG.name}
    />
  );
}
