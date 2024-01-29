/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/types";
import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/spinner";

const formSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  thumbnail: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

interface UpdateFormProp {
  product: Product | null;
}

export const UpdateForm = ({ product }: UpdateFormProp) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(product?.thumbnail);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      brand: product?.brand || "",
      thumbnail: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${product?.id}`,
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
        setOpen(false);
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
    <div className="flex flex-col  w-3/4 space-y-5">
      <div className="flex flex-col">
        <h2 className="text-lg font-medium tracking-tight">Overview product</h2>
        <p className="text-sm text-muted-foreground">
          Introduction of product.
        </p>
      </div>
      <div className="rounded-md border border-neutral-200 p-4">
        {product ? (
          <>
            <div className="flex justify-between w-full space-x-4">
              {image?.length ? (
                <img
                  src={image}
                  alt={product.name}
                  className="w-[30%] object-cover"
                  loading="lazy"
                />
              ) : (
                <img
                  src={product?.thumbnail}
                  alt={product.name}
                  className="w-[30%] object-cover"
                  loading="lazy"
                />
              )}

              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={product?.name || "Product name"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={product?.brand || "Product brand"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {open && (
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              field.onChange(res[0].url);
                              setImage(res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                  {open && (
                    <Button
                      disabled={loading}
                      className="ml-auto"
                      type="submit"
                    >
                      Update
                    </Button>
                  )}
                </form>
              </FormProvider>
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
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
