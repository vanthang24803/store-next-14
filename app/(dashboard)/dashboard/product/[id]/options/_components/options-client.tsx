"use client";

import { Button } from "@/components/ui/button";
import { Option } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface OptionsClient {
  data: Option[] | null;
  productId: string;
}

export const OptionsClient = ({ data, productId }: OptionsClient) => {
  const router = useRouter();

  return (
    <>
      {data && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-end">
            <Button
              onClick={() =>
                router.push(`/dashboard/product/${productId}/options/new`)
              }
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </div>
          <Separator />
          <DataTable searchKey="name" columns={columns} data={data} />
        </div>
      )}
    </>
  );
};
