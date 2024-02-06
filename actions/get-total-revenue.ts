import { Statistical } from "@/types";

const getTotalRevenue = async (): Promise<Statistical> => {
  const URL = `${process.env.API_URL}/api/order/statistical?Status=Success`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getTotalRevenue;
