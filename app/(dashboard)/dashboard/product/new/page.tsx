"use client";

import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { CreateForm } from "./_components/update-from";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import axios from "axios";

export default function ProductId() {
  const [data, setData] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/category`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Create product" description={`Create an product`} />
          </div>
          <Separator />
          <div className="flex justify-between">
            <CreateForm data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
