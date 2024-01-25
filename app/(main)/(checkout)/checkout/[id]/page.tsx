"use client";

import { price } from "@/lib/format-price";
import { Order } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";

interface OrderIdProp {
  params: {
    id: string;
  };
}

export default function OrderId({ params }: OrderIdProp) {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);

  const statusList: { [key: string]: string } = {
    PENDING: "Chờ xác nhận",
    CREATE: "Khởi tạo thành công",
    SHIPPING: "Đơn hàng đang trên đường giao",
    SUCCESS: "Giao hàng thành công",
  };

  const onCopy = () => {
    navigator.clipboard.writeText(params.id);
    toast.success("Mã đơn hàng đã được copy!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${params.id}`
      );

      if (response.status == 200) {
        setOrder(response.data);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="md:w-[500px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-1">
      {order ? (
        <>
          {" "}
          <h1 className="text-xl font-bold text-center uppercase">Chúc Mừng</h1>
          <span className="text-center text-sm">
            Đơn hàng của bạn đã được đặt thành công!
          </span>
          <div className="flex flex-col space-y-2  pt-4">
            <div className="flex space-x-2">
              <span>Mã đơn hàng:</span>
              <span
                className="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1"
                onClick={onCopy}
              >
                {params.id}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Người đặt hàng:</span>
              <span className="font-semibold">{order?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>SĐT:</span>
              <span>{order?.numberPhone}</span>
            </div>
            <div className="flex items-center space-x-2 overflow-hidden">
              <span>Địa chỉ:</span>
              <span className="line-clamp-1">{order?.address}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span>Thành tiền:</span>
              <span className="font-semibold">{price(order?.totalPrice)}₫</span>
            </div>

            <div className="flex items-center space-x-2">
              <span>Trạng thái:</span>
              <span className="font-semibold">{statusList[order?.status]}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span>Ngày đặt:</span>
              <span className="font-semibold">
                {format(order?.createAt, "dd-MM-yyyy HH:mm:ss")}
              </span>
            </div>

            <div className="flex flex-col">
              <span>Danh sách sản phẩm:</span>
              <div className="text-sm space-y-1 my-2">
                {order.products.map((item, index) => (
                  <p key={index}>
                    - {item.name} - {item.option} x{item.quantity}
                  </p>
                ))}
              </div>
            </div>

            <Button variant="primary" onClick={() => router.push("/")}>
              Trang chủ
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
