import { Product } from "@/types";

const getAllProducts = async (limit: number): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Limit=${limit}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getAllProducts;
