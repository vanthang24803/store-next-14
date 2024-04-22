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
import _http from "@/utils/http";

export default function CreateBillboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

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

      const response = await _http.post(
        `/api/product/billboard`,
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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Create billboard" description="Add a new billboard" />
        </div>
        <Separator />
        {imgSrc && <Image src={imgSrc} height="300" width={300} alt="billboard" />}

        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <div className="flex flex-col space-y-2">
            <Label className="font-medium text-sm">Url:</Label>
            <Input
              disabled={loading}
              name="url"
              placeholder="Billboard url"
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
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
