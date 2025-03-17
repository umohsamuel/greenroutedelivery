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
import { ShipmentDetails } from "../modal/shipment-details";
import { Shipment } from "@/types";
import { formatAmount } from "@/utils";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "tracking_id",
    header: "Tracking ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount")) || 0;

      return <div className="font-medium">{formatAmount(amount)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div
          className={`flex items-center gap-1.5 rounded-md px-2 py-1 capitalize ${
            status === "pending"
              ? "text-[#FF9500]"
              : status === "successful"
                ? "text-[#037847]"
                : "text-[#FF3B30]"
          }`}
        >
          <div
            className={`aspect-square h-2 w-2 rounded-full ${
              status === "pending"
                ? "bg-[#FF9500]"
                : status === "successful"
                  ? "bg-[#037847]"
                  : "bg-[#FF3B30]"
            }`}
          />
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
  },
  {
    accessorKey: "pickupLocation",
    header: "Pickup Location",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const deliveryStatus = row.original.deliveryStatus;

      return (
        <div
          className={`flex items-center gap-1.5 rounded-md px-2 py-1 capitalize ${
            deliveryStatus === "cancelled"
              ? "text-[#FF3B30]"
              : deliveryStatus === "in-transit"
                ? "text-[#003F38]"
                : "text-[#34C759]"
          }`}
        >
          <div
            className={`aspect-square h-2 w-2 rounded-full ${
              deliveryStatus === "cancelled"
                ? "bg-[#FF3B30]"
                : deliveryStatus === "in-transit"
                  ? "bg-[#003F38]"
                  : "bg-[#34C759]"
            }`}
          />
          {deliveryStatus}
        </div>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Shipment, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openShipmentDetails, setOpenShipmentDetails] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  function handleCloseShipmentDetails() {
    setOpenShipmentDetails(false);
  }

  const table = useReactTable({
    data,
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
    },
  });

  function handleAscSort() {
    setSorting((prev) =>
      prev.length && prev[0].id === "pickupLocation" && prev[0].desc === false
        ? [{ id: "pickupLocation", desc: true }]
        : [{ id: "pickupLocation", desc: false }]
    );
  }

  function handleRowClick(row: Shipment) {
    setOpenShipmentDetails(true);
    setSelectedShipment(row);
  }

  return (
    <div className="flex flex-col gap-6 rounded-[8px] border border-solid border-[#EEEEEE] p-3 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <h3 className="text-lg font-bold text-[#101828]">
          All shipments{" "}
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
              placeholder="Search Tracking ID"
              className="h-[38px] pl-10"
              value={
                (table.getColumn("tracking_id")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("tracking_id")
                  ?.setFilterValue(event.target.value)
              }
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
                  onClick={() => handleRowClick(row.original)}
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
      <DataTablePagination table={table} />
      <ShipmentDetails
        isOpen={openShipmentDetails}
        onClose={handleCloseShipmentDetails}
        shipment={selectedShipment}
      />
    </div>
  );
}
