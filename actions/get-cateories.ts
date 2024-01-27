import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> => {
  const URL = `${process.env.API_URL}/api/product/category`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getCategories;
