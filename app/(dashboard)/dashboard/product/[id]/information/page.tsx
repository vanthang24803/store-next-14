"use client";

import { Navigation } from "../../_components/navigation";
import useFetchDetailProduct from "@/hooks/use-fetch-detail-product";
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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Anchor, Settings, X } from "lucide-react";
import axios from "axios";

interface ProductIdProp {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  detail: z.string().min(1),
  introduction: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function InformationId({ params }: ProductIdProp) {
  const { data, fetchData } = useFetchDetailProduct({
    id: params.id,
  });

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      detail: "",
      introduction: "",
    },
  });

  useEffect(() => {
    form.setValue("detail", data?.detail || "");
    form.setValue("introduction", data?.introduction || "");
  }, [data, form]);

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}/detail`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setOpen(true);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-between space-x-8">
          <Navigation id={params.id} />
          <div className="flex flex-col w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-medium tracking-tight flex items-center space-x-2">
                  <AlertTriangle /> <p>Product Information</p>
                </h2>
                <p className="text-sm text-muted-foreground">
                  update detail of product.
                </p>
              </div>
              <Button onClick={() => setOpen(!open)}>
                {open ? <Settings /> : <X />}
              </Button>
            </div>
            <div className="rounded-md border border-neutral-200 p-4 ">
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Anchor className="w-4 h-4" />
                          <span>Detail</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[400px]"
                            disabled={open}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="introduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>Introduction</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[400px]"
                            disabled={open}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!open && <Button disabled={loading}>Submit</Button>}
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
