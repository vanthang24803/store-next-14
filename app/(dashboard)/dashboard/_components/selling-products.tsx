"use client";

import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types";
import { TrendingUp } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ProductColumn = {
  name: string;
  sold: number;
  createAt: string;
};

const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => <span className="mx-2">{row.original.sold}</span>
  },
];

export const SellingProducts = () => {
  const { data: products, loading } = useFetch<Product[]>({
    url: "/api/product/selling",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-xl font-bold">Products</CardTitle>
        <CardDescription>
          <TrendingUp className="w-4 h-4" />
        </CardDescription>
      </CardHeader>
      <CardDescription className="pb-4 px-3.5">
        Top products selling
      </CardDescription>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="">
            <DataTable
              searchKey="name"
              columns={columns}
              data={products || []}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
