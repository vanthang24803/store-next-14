"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/date";
import { CellAction } from "./cell-action";


export type CategoryColumn = {
  id: string;
  name: string;
  createAt: string;
};


export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
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
