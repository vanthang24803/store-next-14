"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { format, parseISO } from "date-fns";

export type CategoryColumn = {
  id: string;
  name: string;
  createAt: string;
};

const formatDate = (dateString: any) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
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
