import { Voucher } from "@/types";

const getVouchers = async (): Promise<Voucher[]> => {
  const URL = `${process.env.API_URL}/api/product/voucher`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getVouchers;
