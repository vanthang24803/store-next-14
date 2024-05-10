"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { price } from "@/utils/format-price";
import { formatDate } from "@/utils/date";


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
    cell : ({row}) => <span className="line-clamp-1">{row.original.address}</span>
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
