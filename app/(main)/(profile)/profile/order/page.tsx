/* eslint-disable @next/next/no-img-element */
"use client";

import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/use-auth";
import { price } from "@/lib/format-price";
import { Order } from "@/types";
import axios from "axios";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { statusList } from "@/constant";
import { Menubar } from "../_components/menubar";

export default function Order() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const auth = useAuth();

  const [order, setOrder] = useState<Order[] | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${auth.user?.id}/user`)
      .then((response) => {
        if (response.status === 200) {
          setOrder(response.data);
        }
      });
  }, [auth.user]);

  const router = useRouter();

  return (
    <>
      {isClient && (
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-center flex-col  space-y-4 ">
            <h1 className="text-2xl  font-bold">Đơn hàng của bạn</h1>
            <Separator className="w-[100px] h-1 bg-black rounded" />
          </div>

          <div className="flex flex-col lg:flex-row  md:px-12 px-4 space-y-4 lg:space-y-0">
            <Menubar />

            <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
              <h2 className="uppercase font-semibold">THÔNG TIN ĐƠN HÀNG</h2>
              <div className="flex flex-col space-y-3">
                {order != null ? (
                  <>
                    {order.length > 0 ? (
                      <div className="border border-neutral-200 w-full rounded-md p-4 flex flex-col space-y-4">
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
                                {item.products?.map((item) => (
                                  <div
                                    key={item.productId}
                                    className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                                  >
                                    <div className="flex space-x-4">
                                      <img
                                        src={item.thumbnail}
                                        alt="thumbnail"
                                        className="w-[20%] md:w-[10%] object-cover"
                                        onClick={() =>
                                          router.push(
                                            `/products/${item.productId}`
                                          )
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
                                          <span className="text-lg font-semibold">
                                            {price(item.price)}₫
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <Separator />
                              <div className="text-right text-sm pb-4">
                                <span>
                                  Thành tiền:{" "}
                                  <b className="text-xl font-bold text-[#ee4d2d]">
                                    {price(item.totalPrice)}₫
                                  </b>{" "}
                                </span>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center flex-col space-y-2">
                        <ShoppingBag className="w-24 h-24" strokeWidth={1.5} />
                        <span className="font-medium">
                          Bạn mua đơn hàng nào !
                        </span>
                      </div>
                    )}
                  </>
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
