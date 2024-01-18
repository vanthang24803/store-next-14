import { Product } from "@/types";

const getTopBook = async (
  page: any = 1,
  limit: number,
  category: string
): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Category=${category}&Limit=${limit}&Page=${page}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getTopBook;
