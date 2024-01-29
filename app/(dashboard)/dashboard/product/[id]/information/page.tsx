"use client";

import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigation } from "../../_components/navigation";
import { UpdateForm } from "./_components/update-form";

interface ProductIdProp {
  params: {
    id: string;
  };
}

export default function InformationId({ params }: ProductIdProp) {
  const [data, setData] = useState<Product | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${params.id}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-between space-x-8">
          <Navigation id={params.id} />
          <UpdateForm product={data} />
        </div>
      </div>
    </div>
  );
}
