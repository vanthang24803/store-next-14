"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { price } from "@/utils/format-price";
import { Order } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export const OrderDetail = ({
  order,
  copy,
  id,
}: {
  order: Order | null;
  copy: () => void;
  id: string;
}) => {
  const statusList: { [key: string]: string } = {
    PENDING: "Chờ xác nhận",
    CREATE: "Khởi tạo thành công",
    SHIPPING: "Đơn hàng đang trên đường giao",
    SUCCESS: "Giao hàng thành công",
  };

  const router = useRouter();
  return (
    <>
      {order ? (
        <>
          <h1 className="text-xl font-bold text-center uppercase">Chúc Mừng</h1>
          <span className="text-center text-sm">
            Đơn hàng của bạn đã được đặt thành công!
          </span>
          <div className="flex flex-col space-y-2  pt-4">
            <div className="flex space-x-2">
              <span>Mã đơn hàng:</span>
              <span
                className="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1"
                onClick={copy}
              >
                {id}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Người đặt hàng:</span>
              <span className="font-semibold">{order?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>SĐT:</span>
              <span className="font-semibold">{order?.numberPhone}</span>
            </div>
            <div className="flex items-center space-x-2 overflow-hidden">
              <span>Địa chỉ:</span>
              <span className="line-clamp-1 font-semibold">
                {order?.address}
              </span>
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
    </>
  );
};
