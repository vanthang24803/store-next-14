import type { Metadata } from "next";
import { Products } from "../_components/products-status";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.GIAMGIA.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.GIAMGIA.name}
      thumbnail={Collections.GIAMGIA.thumbnail}
      status={Collections.GIAMGIA.value}
    />
  );
}
