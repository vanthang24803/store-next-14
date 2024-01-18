"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatString } from "@/lib/format-string";
import { Information } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface IntroduceProps {
  data: Information | undefined;
}

export const Introduce = ({ data }: IntroduceProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full p-4 md:p-6 rounded-md bg-white flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-xl font-bold uppercase">MÔ TẢ SẢN PHẨM</span>
        <Separator />
      </div>

      <div className="flex flex-col space-y-1 text-sm">
        <span>Tác giả: {data?.author}</span>
        <span>Dịch giả: {data?.translator}</span>
        <span>Thể loại: {data?.category}</span>
        <span>Khổ sách: {data?.format}</span>
        <span>Số trang: {data?.numberOfPage}</span>
        <span>ISBN: {data?.isbn}</span>
        <span>NXB liên kết: {data?.publisher}</span>
        <span>Phát hành: {data?.company}</span>
        <span>Quà tặng kèm: {data?.gift?.split("<br/>")}</span>
      </div>

      {!show && (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
            onClick={() => setShow(true)}
          >
            <Plus className="w-4 h-4" />
            <span> Xem thêm nội dung </span>
          </Button>
        </div>
      )}

      {show && (
        <div className="flex flex-col space-y-1 text-sm">
          <span>Giá bìa: {data?.price}</span>
          <span>Phát hành: {data?.released}</span>
          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex flex-col space-y-1">
              <span>Giới thiệu:</span>
              <span>{formatString(data?.introduce)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
              onClick={() => setShow(false)}
            >
              <Minus className="w-4 h-4" />
              <span>Rút gọn nội dung </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
