import type { Metadata } from "next";
import { Products } from "../_components/products-status";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.HETHANG.name,
};

export default function Collection() {
  return (
    <Products
      collection={Collections.HETHANG.name}
      thumbnail={Collections.HETHANG.thumbnail}
      status={Collections.HETHANG.value}
    />
  );
}
