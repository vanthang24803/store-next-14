/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductSearch } from "./_components/product-search";
import { PaginationSearch } from "./_components/pagination-search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("product");
  const [product, setProduct] = useState<Product[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product?Name=${search}`
        );
        setProduct(response.data);
        const totalProducts = response.data.length;
        const totalPages = Math.ceil(totalProducts / 15);
        setMaxPage(totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [search]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const start = (currentPage - 1) * 15;
  const end = currentPage * 15;
  const currentPageProducts = product?.slice(start, end);

  return (
    <main className=" p-4">
      <div className="flex items-center justify-center flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Tìm kiếm</h1>
        <span className="text-sm">
          Có <b>{product?.length || 0} sản phẩm</b> cho tìm kiếm
        </span>
        <div className="py-4 w-[80px] ">
          <Separator className="bg-black h-1" />
        </div>
      </div>

      <div className="my-4 flex flex-col space-y-2">
        <span className="text-sm">
          Kết quả tìm kiếm cho <b>"{search}"</b>.
        </span>
        {product ? (
          <>
            {product &&
            currentPageProducts &&
            currentPageProducts.length > 0 ? (
              <ProductSearch products={currentPageProducts} />
            ) : (
              <div className="flex items-center justify-center flex-col space-y-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png"
                  className="w-[90%]"
                />
                <span className="tracking-tight font-medium">
                  Không tìm thấy sản phẩm yêu cầu
                </span>
              </div>
            )}
            <PaginationSearch
              currentPage={currentPage}
              maxPage={maxPage}
              handlerChange={handlePageChange}
            />
          </>
        ) : (
          <div className="h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
}
