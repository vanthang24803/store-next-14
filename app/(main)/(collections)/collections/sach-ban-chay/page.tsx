import type { Metadata } from "next";
import { Products } from "../_components/products-status";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.BANCHAY.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.BANCHAY.name}
      thumbnail={Collections.BANCHAY.thumbnail}
      status={Collections.BANCHAY.value}
    />
  );
}
