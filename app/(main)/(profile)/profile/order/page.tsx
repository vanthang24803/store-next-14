/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { price } from "@/lib/format-price";
import { Order } from "@/types";
import axios from "axios";
import { X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Order() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: session } = useSession();

  const [order, setOrder] = useState<Order[] | null>(null);

  const statusList: { [key: string]: string } = {
    PENDING: "Chờ xác nhận",
    CREATE: "Khởi tạo thành công",
    SHIPPING: "Đơn hàng đang trên đường giao",
    SUCCESS: "Giao hàng thành công",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${session?.user.id}/user`
      );

      if (response.status == 200) {
        setOrder(response.data);
      }
    };

    fetchData();
  }, [session?.user.id]);

  const router = useRouter();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      {isClient && (
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center flex-col  space-y-4 ">
            <h1 className="text-2xl  font-bold">Đơn hàng của bạn</h1>
            <div className="w-[100px] h-1 bg-black rounded"></div>
          </div>

          <div className="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
            <div className="flex flex-col space-y-4 lg:basis-1/4">
              <h2 className="uppercase font-semibold">TÀI KHOẢN</h2>

              <Link
                href="/profile"
                className="hover:text-[#417505] font-medium text-sm"
              >
                Thông tin tài khoản
              </Link>
              <Link
                href="/profile/address"
                className="hover:text-[#417505] font-medium text-sm"
              >
                Địa chỉ
              </Link>
              <Link
                href="/profile/order"
                className="hover:text-[#417505] font-medium text-sm"
              >
                Đơn hàng
              </Link>
              <span
                className="hover:text-[#417505] font-medium text-sm hover:cursor-pointer"
                onClick={() => signOut()}
              >
                Đăng xuất
              </span>
            </div>

            <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
              <h2 className="uppercase font-semibold">THÔNG TIN ĐƠN HÀNG</h2>
              <div className="flex flex-col space-y-3">
                {order != null ? (
                  <div className="border border-neutral-200 w-full rounded-md p-4 flex flex-col space-x-2">
                    {order?.map((item, i) => (
                      <>
                        <div
                          className="flex lg:flex-row flex-col lg:items-center lg:justify-between space-y-2 lg:space-y-0 mb-2"
                          key={i}
                        >
                          <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2">
                            <h1>Mã vận đơn:</h1>
                            <span className="font-semibold">{item.id}</span>
                          </div>
                          <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2">
                            <span>Trạng thái:</span>
                            <span className="font-semibold text-[#417505]">
                              {statusList[item?.status]}
                            </span>
                          </div>
                        </div>
                        <Separator />

                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-col space-y-4 my-4">
                            {item.products?.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                              >
                                <div className="flex space-x-4">
                                  <img
                                    src={item.thumbnail}
                                    alt="thumbnail"
                                    className="w-[20%] md:w-[10%] object-cover"
                                    onClick={() =>
                                      router.push(`/products/${item.productId}`)
                                    }
                                  />
                                  <div className="flex flex-col w-full">
                                    <div className="flex items-center justify-between ">
                                      <span
                                        className="font-semibold line-clamp-2 text-sm md:text-lg"
                                        onClick={() =>
                                          router.push(
                                            `/products/${item.productId}`
                                          )
                                        }
                                      >
                                        {item.name}
                                      </span>
                                      <X />
                                    </div>
                                    <span className="text-neutral-400 text-[12px]">
                                      {item.option}
                                    </span>

                                    <div className="flex items-center justify-between">
                                      <span className="text-neutral-500 ">
                                        x{item.quantity}
                                      </span>
                                      <span className="text-lg font-bold">
                                        {price(item.price)}₫
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Separator />
                          <div className="text-right text-sm">
                            <span>
                              Thành tiền:{" "}
                              <b className="text-xl font-medium text-[#ee4d2d]">
                                {price(item.totalPrice)}₫
                              </b>{" "}
                            </span>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[20vh]">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
