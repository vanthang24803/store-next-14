"use client";

import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { UpdateForm } from "./_components/update-from";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import axios from "axios";
import { Navigation } from "../_components/navigation";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useFetchDetailProduct from "@/hooks/use-fetch-detail-product";

interface ProductIdProp {
  params: {
    id: string;
  };
}

export default function ProductId({ params }: ProductIdProp) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { data, loading, setLoading } = useFetchDetailProduct({
    id: params.id,
  });

  const onDelete = async () => {
    toast.loading("Waiting");
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`
      );
      toast.dismiss();
      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      toast.dismiss();
      setOpen(false);
      setLoading(false);
    }
  };

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
            <Heading title="Edit Product" description={`Id: ${params.id}`} />
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
          <div className="flex justify-between">
            <Navigation id={params.id} />
            <UpdateForm product={data} />
          </div>
        </div>
      </div>
    </>
  );
}
