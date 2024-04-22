/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Navigation } from "../../_components/navigation";
import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { OptionsClient } from "./_components/options-client";
import _http from "@/utils/http";

interface ProductIdProp {
  params: {
    id: string;
  };
}

export default function ProductId({ params }: ProductIdProp) {
  const [product, setProduct] = useState<Product | null>(null);

  const fetchData = async () => {
    const response = await _http.get(
      `/api/product/${params.id}`
    );

    if (response.status == 200) {
      setProduct(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-between">
          <Navigation id={params.id} />
          <div className="flex flex-col  w-3/4 space-y-5">
            <div className="flex flex-col">
              <h2 className="text-lg font-medium tracking-tight">Options</h2>
              <p className="text-sm text-muted-foreground">
                Manage options for your product.
              </p>
            </div>
            <Separator />
            {product ? (
              <OptionsClient data={product?.options} productId={params.id} />
            ) : (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
