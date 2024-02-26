/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { CardItem } from "@/components/card-item";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("product");
  const [product, setProduct] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product?Name=${search}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <main className="md:container p-4">
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
            {product.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {product.map((item, index) => (
                  <CardItem product={item} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col space-y-2">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png" className="w-[90%" />
                <span className="tracking-tight font-medium">Không tìm thấy sản phẩm yêu cầu</span>
              </div>
            )}
            {product.length > 20 && (
              <div className="flex items-center justify-center w-full pt-4">
                <Button className="bg-[#417505] hover:bg-[#65b10d] w-[200px]">
                  Xem Thêm
                </Button>
              </div>
            )}
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
