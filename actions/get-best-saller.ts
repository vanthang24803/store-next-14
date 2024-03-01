import { Product } from "@/types";
import { SACHMOI } from "@/constant";

const getBestSeller = async (): Promise<Product[]> => {
  const URL = `${process.env.API_URL}/api/product?Category=${SACHMOI}&Filter=Lasted`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getBestSeller;
