"use client";

import { Order } from "@/types";
import { Heading } from "../../_components/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface OrderClientProp {
  data: Order[] | undefined;
}

export const OrderClient = ({ data }: OrderClientProp) => {
  return (
    <>
      {data && (
        <>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Heading
                title={`Orders (${data?.length})`}
                description="Manage orders for your store"
              />
            </div>
            <Separator />
            <DataTable searchKey="id" columns={columns} data={data} />
          </div>
        </>
      )}
    </>
  );
};
