import { Product } from "@/types";

const getBestSeller = async (): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product/selling`;

  const response = await fetch(URL, { cache: "no-cache" });


  return response.json();
};

export default getBestSeller;
