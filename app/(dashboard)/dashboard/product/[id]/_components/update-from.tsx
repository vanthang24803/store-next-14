/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";

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
import { Spinner } from "@/components/spinner";
import _http from "@/utils/http";
import { updateProductSchema } from "@/schema/product";

type CreateFormValue = z.infer<typeof updateProductSchema>;

interface Props {
  product: Product | null;
}

export const UpdateForm = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      brand: "",
      thumbnail: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue("name", product?.name || "");
      form.setValue("brand", product?.brand || "");
      form.setValue("thumbnail", product?.thumbnail || "");
      setImage(product?.thumbnail);
    }
  }, [product, form]);

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await _http.put(`/api/product/${product?.id}`, data);
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
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-start gap-8"
                >
                  <div className="basis-1/3 w-full">
                    {image?.length ? (
                      <div className="relative">
                        <img
                          src={image}
                          alt={product.name}
                          className="object-cover"
                          loading="lazy"
                        />
                        {open && (
                          <X
                            className="absolute top-4 right-4 text-neutral-800 hover:cursor-pointer"
                            onClick={() => setImage("")}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="min-h-[300px] w-full">
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
                      </div>
                    )}
                  </div>
                  <div
                    className={`space-y-4 basis-2/3 ${
                      image.length == 0 ? "w-[500px]" : "w-full"
                    }`}
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
                              placeholder={"Product name"}
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
                          <FormLabel>Bard</FormLabel>
                          <FormControl>
                            <Input
                              disabled={!open}
                              placeholder={"Product brand"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {open && (
                      <Button
                        disabled={loading || image.length === 0}
                        className="ml-auto"
                        type="submit"
                      >
                        Update
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
              {open ? (
                <>
                  {image.length > 0 && (
                    <X
                      className="hover:cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  )}
                </>
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
