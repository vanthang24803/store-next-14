"use client";

import { useState } from "react";
import { Option, Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/modal/share-modal";
import { formatPrice, price } from "@/lib/format-price";
import useCart from "@/hooks/use-cart";

interface InforModalProps {
  data?: Product | null;
}

export const InforModal = ({ data }: InforModalProps) => {
  const [option, setOption] = useState<Option | undefined>(data?.options[0]);

  const [total, setTotal] = useState(1);

  const handleOptionChange = (id: string) => {
    const newOption = data?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  const cart = useCart();

  const addToCart = () => {
    if (data && option) {
      const productCopy = { ...data };

      productCopy.options = [option];

      cart.addItem(productCopy, total);
    } else {
      console.error("Data or option is undefined");
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4">
      <h1 className="text-md font-semibold">{data?.name}</h1>
      <div className="text-sm">
        Mã sản phẩm:{" "}
        <span className="text-[#417505] font-bold">{option?.id}</span>
      </div>
      <div className="flex items-center justify-between">
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
          <span className="text-[#417505] font-bold">{data?.brand}</span>
        </div>
      </div>

      <div className="flex items-center space-x-12 text-sm py-2">
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
          {data?.options.map((item, index) => (
            <Button
              variant={item.id === option?.id ? "primary" : "outline"}
              key={index}
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

      {option?.status ? (
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

      <Share productId={data?.id} show={true} />
    </div>
  );
};
