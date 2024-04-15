/* eslint-disable @next/next/no-img-element */
"use client";

import { Product, Option } from "@/types";
import { Thumbnail } from "./thumbnail";
import { useState } from "react";
import { formatPrice, price } from "@/lib/format-price";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Policy } from "./policy";
import { Share } from "@/components/modal/share-modal";
import useCart from "@/hooks/use-cart";

interface DetailCardProp {
  product: Product | undefined;
}

export const DetailCard = ({ product }: DetailCardProp) => {
  const [option, setOption] = useState<Option | undefined>(product?.options[0]);

  const [total, setTotal] = useState(1);

  const handleOptionChange = (id: string) => {
    const newOption = product?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  const cart = useCart();

  const addToCart = () => {
    if (product && option) {
      const productCopy = { ...product };

      productCopy.options = [option];

      cart.addItem(productCopy, total);
    } else {
      console.error("Data or option is undefined");
    }
  };

  return (
    <div className="w-full bg-white rounded-md md:p-8 p-4">
      <div className="flex md:flex-row flex-col md:space-x-4">
        <Thumbnail sale={option?.sale} data={product?.images} />

        <div className="flex flex-col space-y-2 lg:basis-3/4">
          <h2 className="font-bold text-2xl">{product?.name}</h2>
          <div className="text-sm">
            Mã sản phẩm:{" "}
            <span className="text-[#417505] font-bold">{option?.id}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              Tình trạng:{" "}
              {option?.status ? (
                <span className="text-[#417505] font-bold">Còn hàng</span>
              ) : (
                <span className="text-[#417505] font-bold">Hết hàng</span>
              )}
            </div>
            <div className="text-sm">
              Thuơng Hiệu:{" "}
              <span className="text-[#417505] font-bold">{product?.brand}</span>
            </div>
            {product && product?.sold > 0 && (
              <div className="text-sm hidden lg:block">
                Đã bán:{" "}
                <span className="text-[#417505] font-bold">{product.sold}</span>{" "}
                sản phẩm
              </div>
            )}
          </div>
          {product && product?.sold > 0 && (
            <div className="text-sm block lg:hidden">
              Đã bán:{" "}
              <span className="text-[#417505] font-bold">{product.sold}</span>{" "}
              sản phẩm
            </div>
          )}

          <div className="flex flex-col lg:flex-row py-4 space-y-4 lg:space-y-0">
            <div className="flex flex-col space-y-4 lg:w-1/2">
              <div className="flex items-center space-x-6 md:space-x-12 text-sm p-2 w-full bg-neutral-100/80 rounded-md">
                <span className="font-semibold">Giá:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 font-bold text-2xl">
                    {formatPrice(option?.price, option?.sale)}₫
                  </span>
                  {Number(option?.sale) > 0 && (
                    <span className="text-neutral-400 text-lg line-through">
                      {price(option?.price)}₫
                    </span>
                  )}
                </div>
                {Number(option?.sale) > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mx-2 border-red-500 hover:bg-transparent text-red-500 font-semibold hover:text-red-500"
                  >
                    -{option?.sale}%
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm py-2">
                <span className="font-semibold">Tiêu đề:</span>
                <div className="flex items-center space-x-2">
                  {product?.options.map((item, index) => (
                    <Button
                      variant={
                        item.quantity > 0
                          ? item.id === option?.id
                            ? "primary"
                            : "outline"
                          : "outline"
                      }
                      key={index}
                      disabled={item.quantity == 0}
                      onClick={() => handleOptionChange(item.id)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm py-4">
                <span className="font-semibold">Số lượng:</span>
                <div className="flex items-center space-x-2">
                  {total > 0 ? (
                    <Button size="icon" onClick={() => setTotal(total - 1)}>
                      <Minus />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      disabled
                      variant="outline"
                      className="font-medium"
                    >
                      <Minus />
                    </Button>
                  )}
                  <Button disabled variant="outline" size="icon">
                    {total}
                  </Button>
                  <Button size="icon" onClick={() => setTotal(total + 1)}>
                    <Plus />
                  </Button>
                </div>
              </div>

              {product?.options[0].status ? (
                <>
                  {total > 0 ? (
                    <Button
                      variant="default"
                      className="bg-[#417505] text-white font-medium  hover:bg-[#65b10d]"
                      onClick={addToCart}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  ) : (
                    <Button variant="secondary" className="cursor-not-allowed">
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="secondary" className="cursor-not-allowed">
                  Thêm vào giỏ hàng
                </Button>
              )}

              <Share productId={product?.id} />
            </div>
            <Policy />
          </div>
        </div>
      </div>
    </div>
  );
};
