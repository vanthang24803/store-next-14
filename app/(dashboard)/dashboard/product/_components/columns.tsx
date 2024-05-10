"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/utils/date";
import { Option } from "@/types";

export type ProductColumn = {
  id: string;
  name: string;
  brand: string;
  sold: number;
  options: Option[];
  createAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <span className="line-clamp-1">{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => (
      <span className="mx-4">{row.original.options.length}</span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row }) => <span className="mx-2">{row.original.sold}</span>,
  },
  {
    accessorKey: "createAt",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.createAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
