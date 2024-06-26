/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";

import Tiptap from "@/components/tip-tap";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import useClient from "@/hooks/use-client";
import toast from "react-hot-toast";
import _http from "@/utils/http";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  thumbnail: z.string().min(1),
  content: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

const PostForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const auth = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
    },
  });

  const { isClient } = useClient();

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      authorName: auth.user?.name,
      authorAvatar: auth.user?.avatar,
      authorId: auth.user?.id,
    };
    try {
      setLoading(true);
      toast.loading("Waiting! ...");
      const response = await _http.post(`/api/blog`, dataSend);

      if (response.status === 200) {
        toast.success("Thành công");
        router.push(`/blogs`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col space-y-4 py-2 pb-20"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="Tiêu đề"
                  className="text-3xl mt-6 w-full font-medium h-20 outline-none leading-tight placeholder:opacity-90 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex md:flex-row flex-col justify-between w-full min-h-[400px]">
          <div className="md:basis-1/2 md:mx-4">
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
          </div>
          <div className="md:basis-1/2 md:border-l md:border-neutral-200 md:px-8 flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">{form.watch("title")}</h1>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={auth.user?.avatar} className="w-10 h-10" />
                <AvatarFallback>{auth.user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{auth.user?.name}</span>
                <p className="text-xs text-neutral-400">
                  {format(Date.now(), "dd/MM/yyyy HH:ss")}
                </p>
              </div>
            </div>

            {image.length > 0 ? (
              <div className="relative">
                <img
                  src={image}
                  alt="product"
                  className="w-full object-cover md:h-[300px] rounded"
                  loading="lazy"
                />
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 absolute top-0  right-0 hover:cursor-pointer"
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

            <div
              dangerouslySetInnerHTML={{
                __html: form.watch("content").replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </div>

        <Button className="w-[200px]" variant="primary" disabled={loading}>
          Xác nhận
        </Button>
      </form>
    </FormProvider>
  );
};

export default PostForm;
