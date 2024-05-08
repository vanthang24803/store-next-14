import type { Metadata } from "next";
import { Products } from "../_components/products-category";
import { Collections } from "@/constant";

export const metadata: Metadata = {
  title: Collections.TIEUTHUYET.name,
};

export default function Selling() {
  return (
    <Products
      category={Collections.TIEUTHUYET.name}
      collection={Collections.TIEUTHUYET.name}
      thumbnail={Collections.TIEUTHUYET.thumbnail}
    />
  );
}
