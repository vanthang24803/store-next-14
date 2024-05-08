import { Metadata } from "next";
import { Products } from "./_components/products";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
};

export default function AllCategory() {
  return <Products />;
}
