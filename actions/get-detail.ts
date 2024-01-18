import { Product } from "@/types";

const getDetailProduct = async (id: string): Promise<Product> => {
  const URL = `${process.env.API_URL}/api/product/${id}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getDetailProduct;
