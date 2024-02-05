"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

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
import { Heading } from "@/app/(dashboard)/dashboard/_components/heading";
import { Settings2, X } from "lucide-react";
import { Option } from "@/types";

interface OptionIdProp {
  params: {
    id: string;
    optionId: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1),
  sale: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0),
  price: z.coerce.number().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function CreateOptions({ params }: OptionIdProp) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<Option | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}/option/${params.optionId}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, [params.id, params.optionId]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sale: 0,
      quantity: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}/option/${params.optionId}`,
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
        router.push(`/dashboard/product/${params.id}/options`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Update option"
            description={`Update option id ${params.optionId}`}
          />
        </div>
        <Separator />
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between space-x-8"
          >
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-4 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!open}
                          placeholder={data?.name || "Option name"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!open}
                          type="number"
                          placeholder={`${data?.sale}` || "Sale"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!open}
                          placeholder={`${data?.price}` || "Price"}
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!open}
                          type="number"
                          placeholder={`${data?.quantity}` || "Quantity"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {open && (
                <Button disabled={loading} className="mr-auto" type="submit">
                  Update
                </Button>
              )}
            </div>

            <>
              {open ? (
                <X
                  className="hover:cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              ) : (
                <Settings2
                  className="hover:cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )}
            </>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
