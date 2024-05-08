/* eslint-disable @next/next/no-img-element */
"use client";

import { Order } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import * as z from "zod";
import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { price } from "@/utils/format-price";
import { format } from "date-fns";
import { Spinner } from "@/components/spinner";
import useClient from "@/hooks/use-client";
import _http from "@/utils/http";

const formSchema = z.object({
  id: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function SearchOrder() {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const statusList: { [key: string]: string } = {
    PENDING: "Chờ xác nhận",
    CREATE: "Khởi tạo thành công",
    SHIPPING: "Đơn hàng đang trên đường giao",
    SUCCESS: "Giao hàng thành công",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    setLoading(true);
    setError("");
    const fetchData = async () => {
      try {
        const response = await _http.get(`/api/order/${data.id}`);

        if (response.status == 200) {
          setOrder(response.data);
        }
      } catch (error: any) {
        if (error.response.status == 404) {
          setError("Tài khoản không tồn tại");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <div className="md:w-[500px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Tìm kiếm</h2>
        <span className="text-neutral-800 text-sm">
          đơn hàng của AMASK Store
        </span>
      </div>

      {error ? (
        <div className="flex items-center justify-center flex-col space-y-4">
          <img
            src="https://media0.giphy.com/media/cLGoLxqA0dXe4Ndvtk/giphy.gif?cid=ecf05e47l5qho2ho9rfpuwz0rys2mem236plsw93zd620nf4&ep=v1_gifs_related&rid=giphy.gif&ct=s"
            alt="thumbail"
            className="w-1/2"
          />
          <h2 className="text-xl font-semibold capitalize">
            Đơn hàng không tồn tại !
          </h2>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setOrder(null);
              setError("");
              form.reset();
            }}
          >
            Thử lại
          </Button>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {order ? (
                <>
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <span>Mã đơn hàng:</span>
                      <span className="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1">
                        {order?.id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Người đặt hàng:</span>
                      <span className="font-semibold">{order?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>SĐT:</span>
                      <span className="font-semibold">
                        {order?.numberPhone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <span>Địa chỉ:</span>
                      <span className="line-clamp-1 font-semibold">
                        {order?.address}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span>Thành tiền:</span>
                      <span className="font-semibold">
                        {price(order?.totalPrice)}₫
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span>Trạng thái:</span>
                      <span className="font-semibold">
                        {statusList[order?.status]}
                      </span>
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

                    <div className="flex items-center justify-between space-x-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setOrder(null);
                          form.reset();
                        }}
                      >
                        Thoát
                      </Button>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => router.push("/")}
                      >
                        Trang chủ
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <FormProvider {...form}>
                    <form
                      className="flex flex-col space-y-3"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col space-y-1">
                                <span className="font-medium text-sm">
                                  Nhập vào mã vận đơn
                                </span>
                                <Input {...field} autoComplete="off" />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={loading}>
                        Submit
                      </Button>
                    </form>
                  </FormProvider>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
