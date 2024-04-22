"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { format, parseISO } from "date-fns";
import { price } from "@/utils/format-price";

const statusList: { [key: string]: string } = {
  PENDING: "#dc2626",
  CREATE: "#f59e0b",
  SHIPPING: "#0284c7",
  SUCCESS: "#16a34a",
};

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
    header: "Customer",
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
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusList[row.original.status] }}
        ></div>

        <span>{row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => <span>{price(row.original.totalPrice)}₫</span>,
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
