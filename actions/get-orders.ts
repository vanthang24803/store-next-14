import { Order } from "@/types";

const getOrders = async (): Promise<Order[]> => {
  const URL = `${process.env.API_URL}/api/order`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getOrders;
