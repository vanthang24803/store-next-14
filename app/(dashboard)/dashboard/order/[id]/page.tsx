/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Heading } from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { OrderForm } from "./_components/order-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { formatPrice, price } from "@/lib/format-price";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  status: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

interface OrderIdProp {
  params: {
    id: string;
  };
}

const statusList: { [key: string]: string } = {
  PENDING: "#dc2626",
  CREATE: "#f59e0b",
  SHIPPING: "#0284c7",
  SUCCESS: "#16a34a",
};

export default function CategoryId({ params }: OrderIdProp) {
  const router = useRouter();

  const [data, setData] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${params.id}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, [params.id]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        toast.dismiss();
        toast.success("Success");
        setLoading(false);
        router.push("/dashboard/order");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Handler Order" description={`Bill: ${params.id}`} />
          </div>
          <Separator />
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <OrderForm data={data} />

              <div className="w-[300px]">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value || data?.status}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(statusList).map(
                            ([status, color], index) => (
                              <SelectItem value={status} key={index}>
                                <div className="flex items-center space-x-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor: color,
                                    }}
                                  ></div>
                                  <span>{status}</span>
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full rounded-md border border-neutral-200 p-4">
                <ScrollArea className="h-[40vh]">
                  <div className="flex flex-col space-y-4 my-4 w-full">
                    {data?.products.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                      >
                        <div className="flex md:space-x-8 space-x-4">
                          <img
                            src={item.thumbnail}
                            alt="thumbnail"
                            className="w-[100px] object-cover"
                          />
                          <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between ">
                              <Link
                                href={`/products/${item.productId}`}
                                target="_blank"
                                className="font-semibold line-clamp-2"
                              >
                                {item.name}
                              </Link>
                            </div>
                            <span className="text-neutral-400 text-[12px]">
                              {item.option}
                            </span>
                            <span className="text-neutral-400 text-[12px]">
                              x{item.quantity}
                            </span>
                            <div className="flex items-center justify-between my-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-red-600">
                                  {formatPrice(item.price, item.sale)}₫
                                </span>

                                <span className="text-[12px] line-through hidden md:block">
                                  {price(item.price)}₫
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

              <Button disabled={loading} className="ml-auto" type="submit">
                Update
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
