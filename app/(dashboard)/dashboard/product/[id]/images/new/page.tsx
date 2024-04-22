"use client";

import { Heading } from "@/app/(dashboard)/dashboard/_components/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import _http from "@/utils/http";

interface ProductIdProp {
  params: {
    id: string;
  };
}

export default function CreateImages({ params }: ProductIdProp) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<FileList | null>(null);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);

  useEffect(() => {
    if (files) {
      const objectUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImgSrcs(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [files]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading("Waiting");
    try {
      setLoading(true);
      const formData = new FormData();
      if (files) {
        Array.from(files).forEach((file) => {
          formData.append('files', file);
        });
      }

      const response = await _http.post(
        `/api/product/${params.id}/image`,
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
        router.push(`/dashboard/product/${params.id}/images`);
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
          <Heading
            title="Create images"
            description={`Create images for product ${params.id}`}
          />
        </div>
        <Separator />
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {imgSrcs.map((src, index) => (
              <Image
                key={index}
                src={src}
                height={300}
                width={300}
                alt="images"
              />
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-8 w-full">
            <div className="flex flex-col space-y-2">
              <Label className="font-medium text-sm">Files:</Label>
              <Input
                disabled={loading}
                name="files"
                type="file"
                placeholder="Billboard files"
                onChange={(e) => setFiles(e.target.files)}
                multiple
              />
            </div>

            <Button disabled={loading} className="ml-auto" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
