"use client";
import useFetchAttribute from "@/hooks/use-fetch-attribute";
import { Voucher } from "@/types";
import { useRouter } from "next/navigation";
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
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { differenceInDays, format, isBefore, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Heading } from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import _http from "@/utils/http";

interface VoucherIdProp {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  quantity: z.coerce.number().min(1),
  createAt: z.date(),
  shelfLife: z.date(),
  type: z.string(),
  discount: z.coerce.number().min(0),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function VoucherPage({ params }: VoucherIdProp) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { data } = useFetchAttribute<Voucher>({
    id: params.id,
    attribute: "voucher",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      quantity: 0,
      type: "",
      createAt: new Date(),
      shelfLife: new Date(),
      discount: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      const createAt = data.createAt ? parseISO(data.createAt) : null;
      form.setValue("createAt", createAt as Date);
      form.setValue("shelfLife", parseISO(data.shelfLife));
      form.setValue("discount", data.discount);
      form.setValue("title", data.title);
      form.setValue("quantity", data.quantity);
      form.setValue("type", data.type ? "Shipping" : "Sale");
    }
  }, [form, data]);

  const onSubmit = async (data: CreateFormValue) => {
    const differenceDays = differenceInDays(data.shelfLife, data.createAt) + 1;

    const dataSend = {
      ...data,
      day: differenceDays,
      type: data.type === "Shipping",
    };

    try {
      setLoading(true);
      const response = await _http.put(
        `/api/product/voucher/${params.id}`,
        dataSend
      );
      if (response.status == 200) {
        toast.dismiss();
        toast.success("Success");
        setLoading(false);
        router.push("/dashboard/voucher");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title="Update voucher"
              description={`Update voucher ${params.id}`}
            />
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex flex-col space-y-5 w-full">
              <div className="rounded-md border border-neutral-200 p-8">
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder={"Voucher name"} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder={"Voucher title"} {...field} />
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
                                placeholder={"Voucher quantity"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Shipping">
                                  <Label>Shipping</Label>
                                </SelectItem>
                                <SelectItem value="Sale">
                                  <Label>Sale</Label>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={"Voucher discount"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="createAt"
                        render={({ field }) => (
                          <FormItem className="flex flex-col mt-2.5">
                            <FormLabel>Start date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date("1900-01-01") ||
                                    isBefore(date, new Date())
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="shelfLife"
                        render={({ field }) => (
                          <FormItem className="flex flex-col mt-2.5">
                            <FormLabel>End date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date("1900-01-01") ||
                                    isBefore(date, new Date())
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
                    <Button
                      disabled={loading}
                      className="mr-auto"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
