import { TShipment, ShipmentType } from "@/types";
import { formatAmount } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export const defaultNewShipmentData = {
  shipmentType: "" as ShipmentType,
  packageDetails: {
    dimensions: {
      height: 0,
      width: 0,
      length: 0,
    },
    weight: 0,
  },
  destination: {
    country: "",
    state: "",
    city: "",
    address: "",
  },
  source: {
    country: "",
    state: "",
    city: "",
    address: "",
  },
};

export const userColumns: ColumnDef<TShipment>[] = [
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
