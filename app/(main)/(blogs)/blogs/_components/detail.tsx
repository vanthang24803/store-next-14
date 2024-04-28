/* eslint-disable @next/next/no-img-element */
"use client";

import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types";
import _http from "@/utils/http";
import { generateSlug } from "@/utils/slug";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  blog: Blog;
};

export const Detail = ({ blog }: Props) => {
  const [blogs, setBlogs] = useState<Blog[] | null>();
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const response = await _http.get(`/api/blog`);

      if (response.status == 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full min-h-[600px] bg-white rounded p-4 md:p-6 flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-lg md:text-xl">{blog.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-neutral-500 font-medium">
            <p>Tác giả : {blog.authorName}</p>
            <p>
              {" "}
              {format(blog.createAt, "d 'tháng' M, yyyy HH:ss", {
                locale: vi,
              })}
            </p>
          </div>

          <img
            src={blog.thumbnail}
            alt={blog.title}
            title={blog.title}
            className="lg:h-[500px] md:h-[240px] object-contain rounded my-4"
          />
        </div>

        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(/\n/g, "<br/>"),
          }}
        />
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <p>
            Đang xem: <b>{blog.title}</b>
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-bold">Bài viết liên quan</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {blogs?.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col hover:cursor-pointer"
              onClick={() =>
                router.push(`/blogs/${generateSlug(item.title, item.id)}`)
              }
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                title={item.title}
                className="md:h-[240px] object-fill rounded-t"
              />
              <div className="py-6 bg-white p-4 flex flex-col space-y-2 rounded-b">
                <h2 className="font-bold text-lg md:text-xl hover:hover:text-[#65b10d] line-clamp-1">
                  {item.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-neutral-500 font-medium">
                  <p>Tác giả : {item.authorName}</p>
                  <p>
                    {" "}
                    {format(item.createAt, "d 'tháng' M, yyyy HH:ss", {
                      locale: vi,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
