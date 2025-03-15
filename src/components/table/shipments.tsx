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
import { ArrowDownUp, Filter, Search, Pencil, Trash2 } from "lucide-react";
import { DataTablePagination } from "./table-pagination";
import { useState } from "react";
import { ShipmentDetails } from "../modal/shipment-details";
import { Shipment } from "@/types";

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "id",
    header: "Tracking ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
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
    accessorKey: "estimatedDelivery",
    header: "Estimated Delivery",
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
  {
    id: "edit",
    cell: ({ row }) => {
      const _shipment = row.original;

      return <Pencil size={16} color="#6B6B6B" />;
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const _shipment = row.original;

      return <Trash2 size={16} color="#ED2115" />;
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
    <div className="flex flex-col gap-6 rounded-[8px] border border-solid border-[#EEEEEE] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#101828]">
          All shipments <span className="font-medium text-[#65B40E]">(23)</span>
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
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
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

export const shipments: Shipment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    dateCreated: "2025-03-10",
    pickupLocation: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2025-03-20",
    deliveryStatus: "in-transit",
  },
  {
    id: "92adf830",
    amount: 250,
    status: "successful",
    dateCreated: "2025-03-08",
    pickupLocation: "Chicago, IL",
    destination: "Houston, TX",
    estimatedDelivery: "2025-03-18",
    deliveryStatus: "delivered",
  },
  {
    id: "15be9842",
    amount: 75,
    status: "failed",
    dateCreated: "2025-03-05",
    pickupLocation: "Miami, FL",
    destination: "Seattle, WA",
    estimatedDelivery: "2025-03-15",
    deliveryStatus: "cancelled",
  },
  {
    id: "c3a17d6b",
    amount: 180,
    status: "pending",
    dateCreated: "2025-03-12",
    pickupLocation: "San Francisco, CA",
    destination: "Denver, CO",
    estimatedDelivery: "2025-03-22",
    deliveryStatus: "in-transit",
  },
  {
    id: "7f4d9e1c",
    amount: 90,
    status: "successful",
    dateCreated: "2025-03-07",
    pickupLocation: "Austin, TX",
    destination: "Boston, MA",
    estimatedDelivery: "2025-03-17",
    deliveryStatus: "delivered",
  },
  {
    id: "28a94e5d",
    amount: 120,
    status: "pending",
    dateCreated: "2025-03-11",
    pickupLocation: "Detroit, MI",
    destination: "Phoenix, AZ",
    estimatedDelivery: "2025-03-21",
    deliveryStatus: "in-transit",
  },
  {
    id: "4eaf71b2",
    amount: 200,
    status: "failed",
    dateCreated: "2025-03-06",
    pickupLocation: "Portland, OR",
    destination: "Atlanta, GA",
    estimatedDelivery: "2025-03-16",
    deliveryStatus: "cancelled",
  },
  {
    id: "9bf3846a",
    amount: 50,
    status: "successful",
    dateCreated: "2025-03-09",
    pickupLocation: "Las Vegas, NV",
    destination: "Philadelphia, PA",
    estimatedDelivery: "2025-03-19",
    deliveryStatus: "delivered",
  },
  {
    id: "61cae2d8",
    amount: 300,
    status: "pending",
    dateCreated: "2025-03-13",
    pickupLocation: "Seattle, WA",
    destination: "Orlando, FL",
    estimatedDelivery: "2025-03-23",
    deliveryStatus: "in-transit",
  },
  {
    id: "3d2f89b7",
    amount: 110,
    status: "successful",
    dateCreated: "2025-03-04",
    pickupLocation: "Dallas, TX",
    destination: "San Diego, CA",
    estimatedDelivery: "2025-03-14",
    deliveryStatus: "delivered",
  },
  {
    id: "b5e6d123",
    amount: 145,
    status: "failed",
    dateCreated: "2025-03-02",
    pickupLocation: "Charlotte, NC",
    destination: "Indianapolis, IN",
    estimatedDelivery: "2025-03-12",
    deliveryStatus: "cancelled",
  },
  {
    id: "f0b4728d",
    amount: 130,
    status: "pending",
    dateCreated: "2025-03-14",
    pickupLocation: "Nashville, TN",
    destination: "Kansas City, MO",
    estimatedDelivery: "2025-03-24",
    deliveryStatus: "in-transit",
  },
  {
    id: "29c6f8a4",
    amount: 190,
    status: "successful",
    dateCreated: "2025-03-03",
    pickupLocation: "Columbus, OH",
    destination: "San Antonio, TX",
    estimatedDelivery: "2025-03-13",
    deliveryStatus: "delivered",
  },
  {
    id: "87a945f3",
    amount: 160,
    status: "failed",
    dateCreated: "2025-03-01",
    pickupLocation: "Milwaukee, WI",
    destination: "Tampa, FL",
    estimatedDelivery: "2025-03-11",
    deliveryStatus: "cancelled",
  },
  {
    id: "d4f1839b",
    amount: 170,
    status: "pending",
    dateCreated: "2025-03-15",
    pickupLocation: "Sacramento, CA",
    destination: "Raleigh, NC",
    estimatedDelivery: "2025-03-25",
    deliveryStatus: "in-transit",
  },
  {
    id: "c8f92e76",
    amount: 210,
    status: "successful",
    dateCreated: "2025-03-16",
    pickupLocation: "Denver, CO",
    destination: "Salt Lake City, UT",
    estimatedDelivery: "2025-03-26",
    deliveryStatus: "delivered",
  },
  {
    id: "6a45d21e",
    amount: 140,
    status: "failed",
    dateCreated: "2025-03-17",
    pickupLocation: "Minneapolis, MN",
    destination: "Baltimore, MD",
    estimatedDelivery: "2025-03-27",
    deliveryStatus: "cancelled",
  },
];
