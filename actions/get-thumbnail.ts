import { Billboard } from "@/types";

const getBillboard = async (): Promise<Billboard[]> => {
  const URL = `${process.env.API_URL}/api/product/billboard`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getBillboard;
