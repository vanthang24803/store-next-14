"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";
import { Category } from "@/types";
import { AlertModal } from "@/components/modal/alert-modal";
import { Trash } from "lucide-react";

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
import useDeleteAttribute from "@/hooks/use-delete-atribute";
import useFetchAttribute from "@/hooks/use-fetch-attribute";

const formSchema = z.object({
  name: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

interface CategoryIdProp {
  params: {
    id: string;
  };
}

export default function CategoryId({ params }: CategoryIdProp) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useFetchAttribute<Category>({
    id: params.id,
    attribute: "category",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    form.setValue("name", data?.name || "");
  }, [data?.name, form]);

  const onSubmit = async (data: CreateFormValue) => {
    toast.loading("Waiting");
    try {
      setLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${params.id}`,
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

  const { onDelete } = useDeleteAttribute({
    attribute: "category",
    id: params.id,
    setLoading,
    setOpen,
  });

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Edit category" description="Edit a category" />
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
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
                        disabled={loading}
                        placeholder={data?.name || "Category name"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
