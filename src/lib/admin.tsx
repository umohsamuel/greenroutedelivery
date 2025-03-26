import { TShipment } from "@/types";
import { formatAmount } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Check, MoreVertical, Pencil, Plus, Trash } from "lucide-react";
import { AdminEditShipmentCost } from "@/components/modal";
import {
  deleteShipment,
  updatePaymentStatus,
} from "@/server/functions/admin.client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users } from "@/types/users";

export const adminColumns: ColumnDef<TShipment>[] = [
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const shipment = row.original;

      return <AdminTableActions shipment={shipment} />;
    },
  },
];

export function AdminTableActions({ shipment }: { shipment: TShipment }) {
  const router = useRouter();

  async function onMarkAsPaid() {
    await updatePaymentStatus(shipment.id, {
      paymentStatus: "successful",
    }).then((res) => {
      if (res.data) {
        if (res.data.success) {
          toast.success("Payment status updated successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update payment status");
        }
      } else {
        toast.error(res.error ?? "An error occurred");
      }
    });
  }

  async function onDelete() {
    await deleteShipment(shipment.id).then((res) => {
      if (res.data) {
        if (res.data.success) {
          toast.success("Shipment deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete shipment");
        }
      } else {
        toast.error(res.error ?? "An error occurred");
      }
    });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="space-y-3 py-2 text-sm font-normal"
        >
          <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/manage/update?tracking_id=${shipment.tracking_id}`}
              className="flex items-center gap-2"
            >
              <Pencil size={16} color="#6B6B6B" /> Update shipment
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <p className="flex items-center gap-2">
                <Plus size={16} color="#6B6B6B" /> Edit shipment cost
              </p>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onMarkAsPaid}>
            <Check size={16} color="#6B6B6B" /> Mark as paid
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="text-[#FF3B30]">
            <Trash size={16} color="#FF3B30" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AdminEditShipmentCost
        deliveryStatus={shipment.deliveryStatus}
        tracking_id={shipment.tracking_id}
        shipment_id={shipment.id}
      />
    </Dialog>
  );
}

export const adminUsersColumn: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "USER ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
  },
];
