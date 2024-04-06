import { Blog } from "@/types";

const getDetailBlog = async (id: string): Promise<Blog> => {
  const URL = `${process.env.API_URL}/api/blog/${id}`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getDetailBlog;
