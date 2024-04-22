/* eslint-disable @next/next/no-img-element */
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { ListImages } from "./list-images";
import { InforModal } from "./info-modal";
import _http from "@/utils/http";

interface ItemModal {
  productId: string;
}

export const ItemModal = ({ productId }: ItemModal) => {
  const [data, setData] = useState<Product | null>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await _http.get(`/api/product/${productId}`);

      if (response.status == 200) {
        setData(response.data);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-8 h-8 rounded-full items-center justify-center absolute top-[40%] left-[45%] bg-white text-neutral-600  hidden group-hover:flex hover:bg-black hover:text-white ">
          <Eye />
        </div>
      </DialogTrigger>

      <DialogContent>
        <div className="flex items-start justify-between">
          <div className="basis-1/2">
            <ListImages data={data?.images} />
          </div>

          <div className="basis-1/2">
            <InforModal data={data} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
