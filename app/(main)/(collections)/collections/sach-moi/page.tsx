import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.SACHMOI.name,
};

export default function Selling() {
  return (
    <Products
      category={Collections.SACHMOI.name}
      collection={Collections.SACHMOI.name}
      thumbnail={Collections.SACHMOI.thumbnail}
    />
  );
}
