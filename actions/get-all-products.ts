import { Product } from "@/types";

const getAllProducts = async (): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Filter=Lasted`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getAllProducts;
