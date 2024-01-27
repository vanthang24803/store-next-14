"use client";

import { Category} from "@/types";
import { Heading } from "../../_components/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface CategoryClient {
  data: Category[] | undefined;
}

export const CategoryClient = ({ data }: CategoryClient) => {
  const router = useRouter();

  return (
    <>
      {data && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Heading
              title={`Categories (${data?.length})`}
              description="Manage categories for your store"
            />
            <Button onClick={() => router.push(`/dashboard/category/new`)}>
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
