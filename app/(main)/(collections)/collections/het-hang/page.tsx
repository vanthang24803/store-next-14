/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Package2 } from "lucide-react";
import { Filter } from "../_components/filter";
import { FilterType, PriceType, Product } from "@/types";
import { CardItemSmall } from "@/components/card-small-item";
import { SelectFilter } from "../_components/select-filter";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { MobileFilter } from "../_components/mobile-filter";

export default function Category() {
  const [price, setPrice] = useState<PriceType | null>(null);
  const [filter, setFilter] = useState<FilterType | null>(null);

  const handlePriceFilter = (priceType: PriceType) => {
    setPrice((current) => (current === priceType ? null : priceType));
  };

  const handleFilter = (filterType: FilterType) => {
    setFilter((current) => (current === filterType ? null : filterType));
  };

  const reset = () => {
    setPrice(null);
    setFilter(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product?Status=SoldOut&SortBy=${price}&Filter=${filter}&Limit=${itemsPerPage}&Page=${currentPage}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };

    fetchData();
  });

  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentData = data
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="md:max-w-screen-xl mx-auto p-4">
      <div className="flex items-center space-x-3 text-sm font-medium">
        <Link href={`/`}>Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Hết hàng</span>
      </div>
      <div className="lg:flex w-full lg:space-x-12">
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4">
          <Filter price={price} handlePriceFilter={handlePriceFilter} />
        </div>
        <div className="flex flex-col space-y-4">
          <img
            src="https://theme.hstatic.net/200000294254/1001077164/14/collection_banner.jpg?v=323"
            alt="billboard"
            className="rounded-md"
          />

          <div className="flex space-y-2 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center lg:space-x-6 w-full">
                <h1 className="text-2xl font-bold">Hết hàng</h1>
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{data?.length || 0}</span>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-neutral-700">sản phẩm</span>
                    <div className="lg:hidden">
                      <MobileFilter
                        filter={filter}
                        price={price}
                        handleFilter={handleFilter}
                        handlePriceFilter={handlePriceFilter}
                        reset={reset}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SelectFilter handleFilter={handleFilter} />
            </div>

            <>
              {data ? (
                <>
                  {data.length != 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      {currentData?.map((item, index) => (
                        <CardItemSmall key={index} product={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col space-y-2 items-center py-8 text-sm">
                        <Package2 className="w-20 h-20" />
                        <span>Không có sản phẩm phù hợp</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      className="bg-white h-[30vh] md:h-[50vh] lg:h-[30vh]"
                      key={index}
                    />
                  ))}
                </div>
              )}
            </>
          </div>
          <Pagination>
            <PaginationContent>
              {[...Array(pageCount)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => {
                      handlePageChange(i + 1);
                    }}
                    isActive={i + 1 === currentPage}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
