import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

import UpdateShipmentClient from "@/components/pages/(admin)/manage/update/update.client";
import { trackShipment } from "@/server/functions";
import { Label } from "@/components/ui/label";
import { formatAmount, formatDate } from "@/utils";

interface UpdateShipmentProps {
  searchParams: Promise<{ tracking_id?: string }>;
}

export default async function UpdateShipment({
  searchParams,
}: UpdateShipmentProps) {
  const { tracking_id } = await searchParams;
  const shipmentStatus = tracking_id ? await trackShipment(tracking_id) : null;
  console.log({ shipmentStatus });

  const shipmentDetails = shipmentStatus?.data?.success
    ? [
        {
          label: "Date created",
          value: formatDate(shipmentStatus.data.data.createdAt),
        },
        {
          label: "Amount",
          value: formatAmount(shipmentStatus.data.data.amount),
        },
        {
          label: "Pickup address",
          value: `${shipmentStatus.data.data.source.country} ${shipmentStatus.data.data.source.state} ${shipmentStatus.data.data.source.city} ${shipmentStatus.data.data.source.address}`,
        },
        {
          label: "Delivery address",
          value: `${shipmentStatus.data.data.destination.country} ${shipmentStatus.data.data.destination.state} ${shipmentStatus.data.data.destination.city} ${shipmentStatus.data.data.destination.address}`,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-10 px-[5%] pb-12">
      <div className="flex h-full flex-col pt-12 lg:flex-row lg:justify-between">
        <div className="w-full lg:max-w-[25%]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/manage">All shipments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Update shipment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold">Update Shipment</h1>
        </div>
      </div>

      <div className="rounded-[10px] border border-solid border-[#EEEEEE] p-5">
        <DetailsItem label="Tracking ID" value={tracking_id ?? "----"} />

        {shipmentStatus?.data?.success ? (
          <UpdateShipmentClient shipmentStatus={shipmentStatus.data.data} />
        ) : (
          <p>
            {shipmentStatus?.error || "Failed to get the tracking information"}
          </p>
        )}
      </div>

      <div>
        <Label className="text-lg font-bold">Shipment Details</Label>

        <div className="mt-6 flex justify-between">
          <div className="grid w-full grid-cols-2 place-content-between gap-6">
            {shipmentDetails.length > 0 &&
              shipmentDetails.map((sd, idx) => (
                <DetailsItem
                  key={idx}
                  label={sd.label}
                  value={sd.value}
                  className="text-base"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailsItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col text-base text-[#252525]">
      <h4 className="font-light">{label}</h4>
      <p className={cn(`text-2xl font-medium`, className)}>{value}</p>
    </div>
  );
};
