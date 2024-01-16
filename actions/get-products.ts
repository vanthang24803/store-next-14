import { Product } from "@/types";

const getProducts = async (page: any = 1): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Page=${page}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getProducts;
