/* eslint-disable @next/next/no-img-element */
"use client";

import { Filter } from "../_components/filter";
import { SelectFilter } from "../_components/select-filter";
import { MobileFilter } from "../_components/mobile-filter";
import { Collections } from "@/constant";
import useFilterProduct from "@/hooks/use-filter-product";
import useProductByCategory from "@/hooks/use-fetch-product-category";
import { ProductList } from "../_components/product-list";
import { BottomPagination } from "../_components/pagination-bottom";
import { NavigationTop } from "../_components/navigation";

export default function Category() {
  const { filter, handleFilter, reset, price, handlePriceFilter } =
    useFilterProduct();

  const { currentPage, data, pageCount, currentData, handlePageChange } =
    useProductByCategory({
      price,
      filter,
      status: Collections.GIAMGIA.name,
    });

  return (
    <main className="md:max-w-screen-xl mx-auto p-4">
      <NavigationTop collection="Khuyến mãi" />
      <div className="lg:flex w-full lg:space-x-12">
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4">
          <Filter price={price} handlePriceFilter={handlePriceFilter} />
        </div>
        <div className="flex flex-col space-y-4">
          <img
            src={Collections.GIAMGIA.thumbnail}
            alt="billboard"
            className="rounded-md"
          />

          <div className="flex space-y-2 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 lg:items-center lg:space-x-6 w-full">
                <h1 className="text-2xl font-bold">Khuyến mãi</h1>
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

            <ProductList currentData={currentData} data={data} />
          </div>
          <BottomPagination
            currentPage={currentPage}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
