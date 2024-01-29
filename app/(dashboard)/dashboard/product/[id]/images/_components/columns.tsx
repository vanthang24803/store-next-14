"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export type ImageColumn = {
  id: string;
  url: string;

  bookId: string;
  createAt: string;
  updateAt: string;
};

export const columns: ColumnDef<ImageColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "url",
    header: "Image",
    cell: ({ row }) => (
      <Link href={row.original.url} target="_blank">
        {row.original.url}
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
