/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";
import { Billboard } from "@/types";
import { AlertModal } from "@/components/modal/alert-modal";
import { Trash } from "lucide-react";
import useFetchAttribute from "@/hooks/use-fetch-attribute";
import useDeleteAttribute from "@/hooks/use-delete-atribute";
import _http from "@/utils/http";

interface BillboardProp {
  params: {
    id: string;
  };
}

export default function BillboardId({ params }: BillboardProp) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useFetchAttribute<Billboard>({
    attribute: "billboard",
    id: params.id,
  });

  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setUrl(data?.url || "");
    setImgSrc(data?.thumbnail || null);
  }, [data]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImgSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading("Waiting");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("url", url);
      if (file) {
        formData.append("file", file[0]);
      }

      const response = await _http.put(
        `/api/product/billboard/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        toast.dismiss();
        toast.success("Success");
        setLoading(false);
        router.push("/dashboard/billboard");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      console.error(error);
      setLoading(false);
    }
  };

  const { onDelete } = useDeleteAttribute({
    attribute: "billboard",
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
            <Heading title="Edit billboard" description="Edit a billboard." />
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
          {imgSrc && (
            <Image src={imgSrc} height="300" width={300} alt="billboard" />
          )}

          <form onSubmit={onSubmit} className="space-y-8 w-full">
            <div className="flex flex-col space-y-2">
              <Label className="font-medium text-sm">Url:</Label>
              <Input
                disabled={loading}
                name="url"
                placeholder={url || "Billboard url"}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="font-medium text-sm">File:</Label>
              <Input
                disabled={loading}
                name="file"
                type="file"
                placeholder="Billboard file"
                onChange={(e) => setFile(e.target.files)}
              />
            </div>

            <Button disabled={loading} className="ml-auto" type="submit">
              Success
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
