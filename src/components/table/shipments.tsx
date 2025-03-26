"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Filter, Search } from "lucide-react";
import { DataTablePagination } from "./table-pagination";
import { useState } from "react";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   onRowClick?: (row: TData) => void;
//   reversed?: boolean;
//   title?: string;
//   filterKey?: keyof TData;
//   onFilterChange?: (value: string) => void;
// }

interface BaseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  reversed?: boolean;
  title?: string;
  filterKey?: keyof TData;
  onFilterChange?: (value: string) => void;
  paginationType: "client" | "server";
}

interface ServerPaginationProps {
  paginationType: "server";
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

interface ClientPaginationProps {
  paginationType: "client";
  page?: undefined;
  pageSize?: undefined;
  setPage?: undefined;
  setPageSize?: undefined;
}

type DataTableProps<TData, TValue> = BaseDataTableProps<TData, TValue> &
  (ServerPaginationProps | ClientPaginationProps);

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  filterKey,
  reversed = true,
  title,
  onFilterChange,
  paginationType = "client",
  page,
  pageSize,
  setPage,
  setPageSize,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: reversed ? data.reverse() : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      ...(paginationType === "server" &&
      page !== undefined &&
      pageSize !== undefined
        ? {
            pagination: {
              pageIndex: page! - 1,
              pageSize,
            },
          }
        : {}),
    },
    ...(paginationType === "server" &&
    page !== undefined &&
    pageSize !== undefined &&
    setPage !== undefined &&
    setPageSize !== undefined
      ? {
          onPaginationChange: (updater) => {
            setPageSize((prevPageSize) => {
              const { pageIndex, pageSize: newPageSize } =
                typeof updater === "function"
                  ? updater({ pageIndex: page - 1, pageSize: prevPageSize })
                  : updater;

              setPage(pageIndex + 1);
              return newPageSize;
            });
          },
        }
      : {}),
  });

  function handleAscSort() {
    setSorting((prev) =>
      prev.length && prev[0].id === "pickupLocation" && prev[0].desc === false
        ? [{ id: "pickupLocation", desc: true }]
        : [{ id: "pickupLocation", desc: false }]
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-[8px] border border-solid border-[#EEEEEE] p-3 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <h3 className="text-lg font-bold text-[#101828]">
          {title ? title : "All shipments"}{" "}
          <span className="font-medium text-[#65B40E]">({data.length})</span>
        </h3>

        <div className="flex items-center gap-2">
          <div className="relative h-fit w-full max-w-[300px]">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2"
              size={18}
              color="#00000099"
            />
            <Input
              placeholder={`Search ${filterKey ? (filterKey as string) : "Tracking ID"}`}
              className="h-[38px] pl-10"
              value={
                (table
                  .getColumn(filterKey ? (filterKey as string) : "tracking_id")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table
                  .getColumn(filterKey ? (filterKey as string) : "tracking_id")
                  ?.setFilterValue(event.target.value);
                onFilterChange?.(event.target.value);
              }}
            />
          </div>

          <div className="cursor-pointer rounded-[8px] border border-solid border-[#DADADA] p-[10px] shadow-2xl">
            <ArrowDownUp size={18} color="#68706F" onClick={handleAscSort} />
          </div>

          <div className="cursor-pointer rounded-[8px] border border-solid border-[#DADADA] p-[10px] shadow-2xl">
            <Filter size={18} color="#68706F" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-[8px] border">
        <Table>
          <TableHeader className="rounded-t-[8px] bg-[#FCFCFD]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-6 py-3">
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
                  className="cursor-pointer"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
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
                  No shipments yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} paginationType={paginationType} />
    </div>
  );
}
