/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Spinner } from "@/components/spinner";
import useAuth from "@/hooks/use-auth";
import { Blog } from "@/types";
import { MoreHorizontal, Router, Settings, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BottomPagination } from "@/app/(main)/(collections)/collections/_components/pagination-bottom";
import _http from "@/utils/http";

export const BlogContent = () => {
  const auth = useAuth();
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/api/blog/author/${auth.user?.id}`);

      if (response.status === 200) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerDelete = async (id: string) => {
    try {
      _http
        .delete(`/api/blog/${id}`)
        .then(() => {
          toast.success("Thành công");
          fetchBlogs();
        })
        .catch(() => {
          toast.error("Thất bại");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const items = 6;

  const pageCount = blogs ? Math.ceil(blogs.length / items) : 0;
  const currentData = blogs
    ? blogs.slice((currentPage - 1) * items, currentPage * items)
    : [];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {blogs && blogs?.length > 0 ? (
            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentData.map((item) => (
                  <div
                    className="flex flex-col space-y-3 hover:cursor-pointer"
                    key={item.id}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      title={item.title}
                      className="h-56 object-cover rounded"
                    />
                    <div className="flex flex-col my-4">
                      <div className="flex items-start justify-between">
                        <h2 className="text-[14px] font-bold w-[85%] text-wrap">
                          {item.title}
                        </h2>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() => router.push(`/post/${item.id}`)}
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Chỉnh sửa</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handlerDelete(item.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Xoá</span>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <span className="text-[12px] text-neutral-500 my-1">
                        {format(item.createAt, "d 'tháng' M, yyyy HH:ss", {
                          locale: vi,
                        })}
                      </span>
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
          ) : (
            <p>Chưa có bài viết nào</p>
          )}
        </>
      )}
    </>
  );
};
