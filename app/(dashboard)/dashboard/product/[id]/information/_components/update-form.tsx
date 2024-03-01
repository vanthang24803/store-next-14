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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/spinner";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  author: z.string().min(1),
  translator: z.string().min(1),
  category: z.string().min(1),
  format: z.string().min(1),
  numberOfPage: z.string().min(1),
  isbn: z.string().min(1),
  publisher: z.string().min(1),
  company: z.string().min(1),
  gift: z.string().min(1),
  price: z.string().min(1),
  released: z.date(),
  introduce: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

interface UpdateFormProp {
  product: Product | null;
}

export const UpdateForm = ({ product }: UpdateFormProp) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      translator: "",
      category: "",
      format: "",
      numberOfPage: "",
      isbn: "",
      publisher: "",
      company: "",
      gift: "",
      price: "",
      released: new Date(),
      introduce: "",
    },
  });

  React.useEffect(() => {
    form.setValue("author", product?.information?.author || "");
    form.setValue("translator", product?.information?.translator || "");
    form.setValue("category", product?.information?.category || "");
    form.setValue("format", product?.information?.format || "");
    form.setValue("numberOfPage", product?.information?.numberOfPage || "");
    form.setValue("isbn", product?.information?.isbn || "");
    form.setValue("publisher", product?.information?.publisher || "");
    form.setValue("company", product?.information?.company || "");
    form.setValue("gift", product?.information?.gift || "");
    form.setValue("price", product?.information?.price || "");
    form.setValue("introduce", product?.information?.introduce || "");
  }, [form, product?.information]);

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      author: data.author,
      translator: data.translator,
      category: data.category,
      format: data.format,
      numberOfPage: data.numberOfPage,
      isbn: data.isbn,
      publisher: data.publisher,
      company: data.company,
      gift: data.gift,
      price: data.price,
      released: format(data.released, "dd/MM/yyyy"),
      introduce: data.introduce,
    };

    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${product?.id}/information`,
        dataSend,
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
    <div className="rounded-md border border-neutral-200 p-4 w-full">
      {product ? (
        <div className="flex space-x-3">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.author || "Author"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="translator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Translator</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.translator || "Translator"
                            }
                            {...field}
                          />
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
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.category || "Category"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.format || "Format"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfPage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.numberOfPage || "Page"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={product?.information?.isbn || "ISBN"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.publisher || "Publisher"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={
                              product?.information?.company || "Company"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-end space-x-8">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            disabled={!open}
                            placeholder={product?.information?.price || "Price"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="released"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Released</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gift</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={!open}
                          placeholder={product.information?.gift || "Gift"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="introduce"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Introduce</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={!open}
                          placeholder={
                            product?.information?.introduce || "Gift"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} className="ml-auto" type="submit">
                Update
              </Button>
            </form>
          </FormProvider>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
