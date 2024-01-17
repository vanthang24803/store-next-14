import { Product } from "@/types";

const getProducts = async (
  page: any = 1,
  limit:number,
): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Limit=${limit}&Page=${page}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getProducts;
