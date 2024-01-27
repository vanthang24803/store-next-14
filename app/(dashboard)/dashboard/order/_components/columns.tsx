"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { format, parseISO } from "date-fns";
import { price } from "@/lib/format-price";

export type OrderColumn = {
  id: string;
  email: string;
  status: string;
  payment: string;
  address: string;
  name: string;
  totalPrice: number;
  createAt: string;
};

const formatDate = (dateString: any) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => <span>{price(row.original.totalPrice)}</span>,
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
