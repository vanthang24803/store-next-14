/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";

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
import { Button } from "@/components/ui/button";
import { Navigation } from "../../_components/navigation";
import axios from "axios";
import { Category, Product } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";

interface ProductIdProp {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  category: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function ProductId({ params }: ProductIdProp) {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Category[] | null>(null);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/category`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`
    );

    if (response.status == 200) {
      setProduct(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}/category/${data.category}`,
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
        fetchData();
        router.refresh();
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
        <div className="flex justify-between">
          <Navigation id={params.id} />
          <div className="flex flex-col  w-3/4 space-y-5">
            <div className="flex flex-col">
              <h2 className="text-lg font-medium tracking-tight">Categories</h2>
              <p className="text-sm text-muted-foreground">
                Add an category to product.
              </p>
            </div>
            <div className="rounded-md border border-neutral-200 p-4">
              {product ? (
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                  >
                    <div className="flex flex-col space-y-3">
                      <span className="font-medium tracking-tight">
                        List Categories:
                      </span>
                      <div className="flex flex-col text-sm  text-muted-foreground">
                        {product?.categories.map((item) => (
                          <span key={item.id}> - {item.name}</span>
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a category"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {data?.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={loading}
                      className="ml-auto"
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                </FormProvider>
              ) : (
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
