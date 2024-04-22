/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { X } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { Separator } from "@/components/ui/separator";
import { UpdateCart } from "@/components/cart/update-cart";
import { useRouter } from "next/navigation";
import { formatPrice, price } from "@/utils/format-price";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import useClient from "@/hooks/use-client";

export default function Cart() {
  const cart = useCart();

  const router = useRouter();

  const { isClient } = useClient();

  return (
    <>
      {isClient && (
        <main className="md:max-w-screen-xl mx-auto p-4">
          <p className="py-2 flex items-center space-x-3 text-sm">
            <Link href={`/`}>Trang chủ</Link>
            <span>/</span>
            <span>Giỏ hàng ({cart.totalItems()})</span>
          </p>

          <div className="flex lg:flex-row flex-col justify-between  lg:space-x-4 w-full">
            <div className="lg:w-2/3 w-full  bg-white rounded p-4 flex flex-col space-y-3">
              <h1 className="text-xl font-bold">Giỏ hàng của bạn</h1>
              <Separator />

              <span>
                Bạn đang có <b>{cart.totalItems()} sản phẩm</b> trong giỏ hàng
              </span>

              <div className="w-full rounded-md border border-neutral-200 p-4">
                <ScrollArea className="h-[50vh]">
                  <div className="flex flex-col space-y-4 my-4 w-full">
                    {cart.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                      >
                        <div className="flex md:space-x-8 space-x-4">
                          <img
                            src={item.product.thumbnail}
                            alt="thumbnail"
                            className="w-[20%] md:w-[10%] object-cover"
                            onClick={() =>
                              router.push(`/products/${item.product.id}`)
                            }
                          />
                          <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between ">
                              <Link
                                href={`/products/${item.product.id}`}
                                target="_blank"
                                className="font-semibold line-clamp-2"
                              >
                                {item.product.name}
                              </Link>
                              <X
                                className="w-6 h-6"
                                onClick={() =>
                                  cart.removeItem(
                                    item.product.id,
                                    item.product.options[0].id
                                  )
                                }
                              />
                            </div>
                            <span className="text-neutral-400 text-[12px]">
                              {item.product.options[0].name}
                            </span>
                            <div className="flex items-center justify-between my-2">
                              <UpdateCart
                                productId={item.product.id}
                                optionId={item.product.options[0].id}
                                quantity={item.quantity}
                              />

                              <div className="flex items-center space-x-2">
                                <span className="font-semibold ">
                                  {formatPrice(
                                    item.product.options[0].price,
                                    item.product.options[0].sale
                                  )}
                                  ₫
                                </span>

                                <span className="text-[12px] line-through hidden md:block">
                                  {price(item.product.options[0].price)}₫
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <span className="text-sm font-bold py-3">Ghi chú đơn hàng</span>
              <textarea
                role="60"
                color="10"
                className="w-full rounded-md border border-neutral-200 p-4"
              ></textarea>
            </div>
            <div className="lg:w-1/3 w-full lg:h-[38vh]  bg-white rounded p-4 flex flex-col space-y-3">
              <h1 className="text-xl font-bold">Giỏ hàng của bạn</h1>
              <Separator />
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Tổng tiền:</h2>
                <p className="text-2xl font-bold text-[#ff0000]">
                  {price(cart.totalPrice())}₫
                </p>
              </div>
              <Separator />
              <ul className="text-sm text-neutral-600 space-y-1 pb-4">
                <li>Đổi trả sản phẩm trong 7 ngày do lỗi sản xuất.</li>
                <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
              </ul>
              <Button
                variant="destructive"
                disabled={cart.totalItems() == 0}
                onClick={() => router.push(`/checkout`)}
                className="bg-[#ff0000] uppercase font-semibold"
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
