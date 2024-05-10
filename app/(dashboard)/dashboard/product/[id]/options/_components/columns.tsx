"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { price } from "@/utils/format-price";
import { formatDate } from "@/utils/date";


export type OptionColumn = {
  id: string;
  name: string;
  sale: number;
  quantity: number;
  price: number;
  status: boolean;

  bookId: string;

  createAt: string;
  updateAt: string;
};

export const columns: ColumnDef<OptionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sale",
    header: "Sale",
    cell: ({ row }) => (
      <span>{row.original.sale > 0 ? `${row.original.sale}% ` : "Không"}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{price(row.original.price)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
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
