"use client";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import Tiptap from "@/components/tip-tap";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { StarRating } from "./star-rating";
import useAuth from "@/hooks/use-auth";
import { Upload } from "./upload";

const formSchema = z.object({
  content: z.string().min(1).max(255),
});

type CreateFormValue = z.infer<typeof formSchema>;

type Props = {
  id: string;
};

export const Rating = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const auth = useAuth();

  const onSubmit = async (data: CreateFormValue) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("star", String(rating));
    formData.append("customerName", auth.user!.name);
    formData.append("customerId", auth.user!.id);
    formData.append("customerAvatar", auth.user!.avatar);
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Thành công");
      setOpen(false);
      setRating(null);
      setFiles(null);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-[#33BBC5] hover:bg-[#85E6C5]">Đánh giá</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Đánh giá đơn hàng của bạn
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <StarRating setRating={setRating} rating={rating} />

            <Upload files={files} setFiles={setFiles} />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Tiptap
                      {...field}
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={rating === null || loading}
            >
              Xác nhận
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
