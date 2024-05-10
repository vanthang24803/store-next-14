"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, CreditCard, Filter, Store, Trash, Truck } from "lucide-react";

const statusList: { [key: string]: string } = {
  PENDING: "#dc2626",
  CREATE: "#f59e0b",
  SHIPPING: "#0284c7",
  SUCCESS: "#16a34a",
};

const paymentType = [
  {
    name: "COD",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    name: "BANK",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "SHOP",
    icon: <Store className="w-5 h-5" />,
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  statusFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  statusFilter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleStatusFilter = (status: string) => {
    if (filter == status) {
      setFilter(null), table.getColumn("status")?.setFilterValue(null);
    } else {
      setFilter(status), table.getColumn("status")?.setFilterValue(status);
    }
  };

  const handlePaymentFilter = (type: string) => {
    if (payment == type) {
      setPayment(null);
      table.getColumn("payment")?.setFilterValue(null);
    } else {
      setPayment(type);
      table.getColumn("payment")?.setFilterValue(type);
    }
  };

  const handlerResetFilter = () => {
    setPayment(null);
    setFilter(null);
    table.getColumn("payment")?.setFilterValue(null);
    setFilter(null), table.getColumn("status")?.setFilterValue(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 w-full">
          <Input
            placeholder="Search"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        {statusFilter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.entries(statusList).map(([status, color], index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-center justify-between"
                  onSelect={() => handleStatusFilter(status)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                    <span>{status}</span>
                  </div>
                  {filter == status && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              {paymentType.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-center justify-between"
                  onSelect={() => handlePaymentFilter(item.name)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {payment == item.name && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handlerResetFilter()}>
                <div className="flex items-center space-x-3">
                  <Trash className="w-5 h-5" />
                  <span>Reset</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getState().pagination.pageIndex + 1} of { table.getPageCount() } page (s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
