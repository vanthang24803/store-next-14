import getProducts from "@/actions/get-products";
import { ProductClient } from "./_components/product-client";

export default async function Product() {
  const product = await getProducts();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <ProductClient data={product} />
      </div>
    </div>
  );
}
