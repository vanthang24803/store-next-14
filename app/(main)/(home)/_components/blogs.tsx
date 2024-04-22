"use client";

import { Spinner } from "@/components/spinner";
import { Blog } from "@/types";
import _http from "@/utils/http";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/api/blog`);

      if (response.status == 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [firstBlog, ...data] = blogs?.slice(0, 4) ?? [];

  return (
    <div className="w-full bg-white rounded-md p-6">
      <Link href="/blogs" className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Thông Báo Bản Quyền</h2>
        <div className="flex items-center text-sm space-x-1 text-sky-500 font-semibold">
          <p>Xem thêm</p>
          <ChevronRight className="w-4 h-4" />
        </div>
      </Link>

      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex md:flex-row flex-col my-4 space-y-4 md:space-y-0 md:space-x-4">
            {firstBlog && (
              <div
                className="md:basis-1/2 w-full flex flex-col hover:cursor-pointer"
                onClick={() => router.push(`/blogs/${firstBlog.id}`)}
              >
                <Image
                  src={firstBlog.thumbnail}
                  width={500}
                  height={500}
                  alt={firstBlog.authorName}
                  className="rounded-md hover:cursor-pointer"
                  title={firstBlog.title}
                />
                <h3 className="font-bold text-lg mt-4 hover:hover:text-[#65b10d]">
                  {firstBlog.title}
                </h3>
                <p className="text-xs ">
                  {format(firstBlog.createAt, "d 'tháng' M, yyyy", {
                    locale: vi,
                  })}
                </p>
              </div>
            )}
            {data && (
              <div className="md:basis-1/2 w-full flex flex-col space-y-4 lg:space-y-6">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 hover:cursor-pointer"
                    onClick={() => router.push(`/blogs/${item.id}`)}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={150}
                      height={100}
                      className="rounded-md object-cover"
                      title={item.title}
                    />
                    <div className="flex flex-col">
                      <h4 className="font-medium text-[14px] hover:hover:text-[#65b10d]">
                        {item.title}
                      </h4>
                      <span className="text-xs">
                        {format(item.createAt, "d 'tháng' M, yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
