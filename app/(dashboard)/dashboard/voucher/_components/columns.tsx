"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { format, parseISO } from "date-fns";

export type VoucherColumn = {
  id: string;
  name: string;
  quantity: number;
  day: number;
  createAt: string;
  shelfLife: string;
  expire: boolean;
};

const formatDate = (dateString: any) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};

export const columns: ColumnDef<VoucherColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "shelfLife",
    header: "Expiry",
    cell: ({ row }) => <span>{formatDate(row.original.shelfLife)}</span>,
  },
  {
    accessorKey: "expire",
    header: "Expire",
  },
  {
    accessorKey: "createAt",
    header: "Create",
    cell: ({ row }) => <span>{formatDate(row.original.createAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
