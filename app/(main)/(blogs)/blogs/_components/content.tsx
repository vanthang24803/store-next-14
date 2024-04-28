/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Blog } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { BottomPagination } from "@/app/(main)/(collections)/collections/_components/pagination-bottom";
import _http from "@/utils/http";
import { generateSlug } from "@/utils/slug";

export const Content = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const items = 4;

  const pageCount = blogs ? Math.ceil(blogs.length / items) : 0;
  const currentData = blogs
    ? blogs.slice((currentPage - 1) * items, currentPage * items)
    : [];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full min-h-[300px]  rounded">
      {loading ? (
        <div className="flex items-center justify-center bg-white">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentData?.map((item) => (
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
                  className="lg:h-[400px] md:h-[240px] object-fill rounded-t"
                />
                <div className="py-6 bg-white p-4 flex flex-col space-y-2 rounded-b">
                  <h2 className="font-bold text-lg md:text-xl hover:hover:text-[#65b10d]">
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
          <BottomPagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
