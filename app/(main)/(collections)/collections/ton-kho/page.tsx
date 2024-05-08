import type { Metadata } from "next";
import { Products } from "../_components/products-status";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.TONKHO.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.TONKHO.name}
      thumbnail={Collections.TONKHO.thumbnail}
      status={Collections.TONKHO.value}
    />
  );
}
