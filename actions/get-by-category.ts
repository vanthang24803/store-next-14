import { Product } from "@/types";

const getByCategory = async (
  limit: number = 20,
  category: string
): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Category=${category}&Limit=${limit}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getByCategory;
