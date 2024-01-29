import { ProductClient } from "./_components/product-client";
import getAllProducts from "@/actions/get-all-products";

export default async function Product() {
  const product = await getAllProducts(1000);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <ProductClient data={product} />
      </div>
    </div>
  );
}
