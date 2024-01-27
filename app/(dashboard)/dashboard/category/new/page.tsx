"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { Label } from "@radix-ui/react-label";
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
import { Form, FormProvider, useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

export default function CreateCategory() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/category`,
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
        router.push("/dashboard/category");
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
          <Heading title="Create category" description="Add a new category" />
        </div>
        <Separator />
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
              Create
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
