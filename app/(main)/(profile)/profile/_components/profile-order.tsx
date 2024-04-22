/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { statusList } from "@/constant";
import { price } from "@/utils/format-price";
import { Order } from "@/types";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Rating } from "./rating";
import Link from "next/link";

export const ProfileOrder = ({ order }: { order: Order[] }) => {
  const router = useRouter();
  return (
    <>
      {order.length > 0 ? (
        <div className="border border-neutral-200 w-full rounded-md p-4 flex flex-col  space-y-4">
          {order?.map((item, i) => (
            <div key={i}>
              <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between space-y-2 lg:space-y-0 mb-2">
                <div className="flex lg:flex-row flex-col lg:items-center lg:space-x-2">
                  <h1>Mã vận đơn:</h1>
                  <div className="flex items-center">
                    <span className="font-semibold">{item.id}</span>

                    {(item.status == "SUCCESS" || item.status == "PENDING") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive hover:text-white mx-2"
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
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
                    <Link href={`/products/${item.productId}`} target="_blank"
                      key={item.productId}
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
                                router.push(`/products/${item.productId}`)
                              }
                            >
                              {item.name}
                            </span>
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
                    </Link>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-end text-sm pb-4">
                  <div className="flex items-center space-x-3 mt-2">
                    {item.status === "SUCCESS" && (
                      <Rating id={item.products[0].productId} />
                    )}
                    <span>
                      Thành tiền:{" "}
                      <b className="text-xl font-bold text-[#ee4d2d]">
                        {price(item.totalPrice)}₫
                      </b>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-2">
          <ShoppingBag className="w-24 h-24" strokeWidth={1.5} />
          <span className="font-medium">Bạn mua đơn hàng nào !</span>
        </div>
      )}
    </>
  );
};
