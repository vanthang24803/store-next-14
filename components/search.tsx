/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types";

import Link from "next/link";

import { formatPrice } from "@/lib/format-price";
import { Separator } from "./ui/separator";

export const SearchPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  const search = searchParams.get("Name");

  const [content, setContent] = useState(search || "");

  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product?Name=${content}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [content]);

  useEffect(() => {
    const query = {
      Name: content,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [router, content]);

  return (
    <div className="relative md:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[500px] md:w-[300px] h-10 font-medium"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
        placeholder="Tìm kiếm sản phẩm..."
      />
      <div className="absolute top-1 right-1 w-14 h-5/6 flex items-center justify-center bg-[#417505] rounded-md cursor-pointer hover:bg-[#65b10d]">
        <Search className="w-4 h-4 text-white hover:cursor-pointer " />
      </div>
      {open && (
        <div className="lg:w-[500px] md:w-[300px] lg:min-h-[20vh] min-h-[15vh]  rounded-md bg-white dark:bg-neutral-700/90  p-4 md:absolute md:top-12 md:-right-2">
          <p className="text-sm font-medium">Gợi ý cho bạn:</p>
          {content != "" && (
            <div className="w-full h-auto my-2 text-sm flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                {product.slice(0, 5).map((item, index) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <Link
                      href={`/products/${item.id}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex flex-col space-y-1 ">
                        <span className="hover:text-[#65b10d] font-medium">
                          {item.name}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">
                            {item.options[0].price}₫
                          </span>
                          <span className="line-through text-neutral-500 text-xs">
                            {formatPrice(
                              item.options[0].price,
                              item.options[0].sale
                            )}
                            ₫
                          </span>
                        </div>
                      </div>
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-[8%]"
                      />
                    </Link>
                    <Separator />
                  </div>
                ))}
              </div>
              <Link
                href={`/search`}
                className="flex items-center justify-center pt-1"
              >
                Xem thêm {product.length} sản phẩm
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
