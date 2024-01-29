"use client";

import { Heading } from "@/app/(dashboard)/dashboard/_components/heading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductIdProp {
  params: {
    id: string;
  };
}

export default function CreateImage({ params }: ProductIdProp) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      if (file) {
        formData.append("file", file[0]);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}/image`,
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
            description={`Create an image for product ${params.id}`}
          />
        </div>
        <Separator />
        <div className="flex justify-between space-x-4">
          {imgSrc && (
            <Image src={imgSrc} height="300" width={300} alt="billboard" />
          )}

          <form onSubmit={onSubmit} className="space-y-8 w-full">
          
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
    </div>
  );
}
