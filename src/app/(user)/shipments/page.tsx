import { columns, DataTable } from "@/components/table/shipments";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getShipments } from "@/server/functions";
import { formatDate } from "@/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Shipments() {
  const shipmentsData = await getShipments();

  console.log({ shipmentsData });

  const parsedShipmentsData = shipmentsData.data?.success
    ? shipmentsData.data.data.map((sm) => ({
        id: sm._id,
        tracking_id: sm.trackingId,
        amount: sm.amount ?? "N/A",
        status: sm.paymentStatus,
        dateCreated: formatDate(sm.createdAt),
        pickupLocation: `${sm.source.address}, ${sm.source.city}, ${sm.source.state}, ${sm.source.country}`,
        destination: `${sm.destination.address}, ${sm.destination.city}, ${sm.destination.state}, ${sm.destination.country}`,
        deliveryStatus: sm.status,
      }))
    : [];

  return (
    <div className="px-[5%] py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-[40px] font-bold">My Shipments</h1>
          <p>Track and manage all your package deliveries in one place.</p>
        </div>
        <Link
          href={`/shipments/new`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-11 bg-[#003F38] px-4 py-3"
          )}
        >
          <Plus size={24} fill="" />
          <span className="textGradient">Add New Shipment</span>
        </Link>
      </div>

      <div className="mt-10">
        <DataTable columns={columns} data={parsedShipmentsData} />
      </div>
    </div>
  );
}
