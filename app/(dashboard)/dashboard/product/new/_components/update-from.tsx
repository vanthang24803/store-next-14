/* eslint-disable @next/next/no-img-element */
"use client";

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
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@/types";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";
import _http from "@/utils/http";

const formSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  thumbnail: z.string().min(1),
  category: z.string().min(1),
  option: z.string().min(1),
  sale: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export const CreateForm = () => {
  const [data, setData] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await _http.get(`/api/product/category`);

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      thumbnail: "",
      category: "",
      option: "",
      sale: 0,
      quantity: 0,
      price: 0,
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      name: data.name,
      brand: data.brand,
      thumbnail: data.thumbnail,
      category: data.category,
      options: [
        {
          name: data.option,
          sale: data.sale,
          quantity: data.quantity,
          price: data.price,
        },
      ],
    };

    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await _http.post(`/api/product`, dataSend);
      if (response.status == 200) {
        toast.dismiss();
        toast.success("Success");
        setLoading(false);
        router.push("/dashboard/product");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="rounded-md border border-neutral-200 p-8">
        <>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full space-x-8"
            >
              {image.length > 0 ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="product"
                    className="w-[300px] object-cover"
                    loading="lazy"
                  />
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 absolute top-0 right-0 hover:cursor-pointer hover:scale-110 ease-linear"
                    onClick={() => setImage("")}
                  >
                    <X />
                  </div>
                </div>
              ) : (
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

              <div className="space-y-4 w-full">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder={"Product name"} {...field} />
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
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder={"Product brand"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Option</FormLabel>
                        <FormControl>
                          <Input placeholder={"Option"} {...field} />
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
                            type="number"
                            placeholder={"Price"}
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
                            type="number"
                            placeholder={"Sale"}
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
                            type="number"
                            placeholder={"Quantity"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={loading} className="ml-auto" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      </div>
    </div>
  );
};
