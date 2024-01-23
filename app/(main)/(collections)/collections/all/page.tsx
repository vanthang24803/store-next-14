/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Filter } from "../_components/filter";
import { FilterType, PriceType, Product } from "@/types";
import { CardItemSmall } from "@/components/card-small-item";
import { SelectFilter } from "../_components/select-filter";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function AllCategory() {
  const [price, setPrice] = useState<PriceType | null>(null);
  const [filter, setFilter] = useState<FilterType | null>(null);

  const handlePriceFilter = (priceType: PriceType) => {
    setPrice((current) => (current === priceType ? null : priceType));
  };

  const handleFilter = (filterType: FilterType) => {
    setFilter((current) => (current === filterType ? null : filterType));
  };

  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product?SortBy=${price}&Filter=${filter}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };

    fetchData();
  });

  return (
    <main className="md:max-w-screen-xl mx-auto p-4">
      <div className="flex items-center space-x-3 text-sm font-medium">
        <Link href={`/`}>Trang chủ</Link>
        <ChevronRight className="w-4 h-4" />
        <span>Tất cả sản phẩm</span>
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
              <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center lg:space-x-6">
                <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{data?.length || 0}</span>
                  <span className="text-sm text-neutral-700">sản phẩm</span>
                </div>
              </div>
              <SelectFilter handleFilter={handleFilter} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {data?.slice(0, 20).map((item, index) => (
                <CardItemSmall key={index} product={item} />
              ))}
            </div>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
