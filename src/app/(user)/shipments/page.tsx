import { columns, DataTable, shipments } from "@/components/table/shipments";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Shipments() {
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
        <DataTable columns={columns} data={shipments} />
      </div>
    </div>
  );
}
