"use client";

import { useStopScroll } from "@/hooks";
import { getAShipment } from "@/server/functions/user.client";
import { Shipment } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, X } from "lucide-react";
import ReactDOM from "react-dom";
import { formatDate } from "../../utils/formatDate";
import { formatAmount } from "@/utils";

interface ShipmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
}

export function ShipmentDetails({
  isOpen,
  onClose,
  shipment,
}: ShipmentDetailsProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["getAShipment", shipment?.id],
    queryFn: () => getAShipment(shipment?.id ?? ""),
    enabled: !!shipment?.id,
  });

  console.log({ data });

  useStopScroll({ isOpen });

  const basicInfo =
    data && data.data?.success
      ? [
          {
            title: "Date created",
            desc: formatDate(data.data.data.createdAt),
          },
          {
            title: "Amount",
            desc: formatAmount(parseFloat(data.data.data.amount) || 0),
          },
          {
            title: "Total Weight",
            desc: data.data.data.packageDetails.weight + "kg",
          },
          {
            title: "Pickup address",
            desc: `${data.data.data.source.address}, ${data.data.data.source.city}, ${data.data.data.source.state}, ${data.data.data.source.country}`,
          },
          {
            title: "Delivery address",
            desc: `${data.data.data.destination.address}, ${data.data.data.destination.city}, ${data.data.data.destination.state}, ${data.data.data.destination.country}`,
          },
        ]
      : [];

  const packageDetails =
    data && data.data?.success
      ? [
          {
            title: "Length",
            desc: data.data.data.packageDetails.dimensions.length + "inches",
          },
          {
            title: "Width",
            desc: data.data.data.packageDetails.dimensions.width + "inches",
          },
          {
            title: "Height",
            desc: data.data.data.packageDetails.dimensions.height + "inches",
          },
        ]
      : [];

  const updatedStatus =
    data && data.data?.success
      ? data.data.data.updatedStatus.map((us) => ({
          title: us.shipment,
          completed: true,
          timestamp: formatDate(us.timestamp),
          id: us._id,
        }))
      : [];

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-end bg-black/50 px-[2.5%]">
      <div className="h-[95vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white px-7 py-[22px] text-[#1F1F1F] shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-lg font-bold">Shipment Details</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {isPending ? (
          <div className="flex w-full animate-spin items-center justify-center">
            <LoaderCircle size={24} color="#65B40E" />
          </div>
        ) : error ? (
          "Error occured while fetching shipment details"
        ) : data && data.data?.success ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col text-base text-[#252525]">
                <h4 className="font-normal">Tracking ID</h4>
                <p className="text-2xl font-medium">
                  {data.data.data.trackingId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-9 border-y border-dotted border-[#DADADA] py-5">
              {basicInfo.map((bi) => (
                <ShipmentItem key={bi.title} title={bi.title} desc={bi.desc} />
              ))}
            </div>

            <div className="flex flex-col gap-4 border-b border-dotted border-[#DADADA] py-5">
              <h4 className="text-base font-medium">Package Details</h4>

              <div className="grid grid-cols-3 gap-9">
                {packageDetails.map((bi) => (
                  <ShipmentItem
                    key={bi.title}
                    title={bi.title}
                    desc={bi.desc}
                  />
                ))}
              </div>
            </div>
            <TrackingStatus statusSteps={updatedStatus} />
          </>
        ) : (
          "No shipment details found."
        )}
      </div>
    </div>,
    document.body
  );
}

const ShipmentItem = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-4 text-base text-[#252525]">
      <h4 className="font-normal">{title}</h4>
      <p className="font-medium">{desc}</p>
    </div>
  );
};

interface TrackingStatusProps {
  statusSteps?: {
    title: string;
    completed: boolean;
    timestamp: string;
    id: string;
  }[];
}

const TrackingStatus = ({ statusSteps }: TrackingStatusProps) => {
  return (
    <div className="w-full py-5">
      <h1 className="mb-4 text-base font-medium">Tracking Status</h1>

      <div className="relative">
        {statusSteps &&
          statusSteps.map((step, index) => (
            <div key={index} className="relative mb-8 flex gap-4">
              {index < statusSteps.length - 1 && (
                <div className="absolute top-6 left-[8px] z-[51] h-full w-[1px] -translate-x-[50%] bg-[#929292]"></div>
              )}

              <div className="relative z-[52] mt-1 mr-4">
                {step.completed ? (
                  <div className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-solid border-[#65B40E] bg-white">
                    <div className="w-h-1 aspect-square h-1 rounded-full bg-green-500"></div>
                  </div>
                ) : (
                  <div className="aspect-square h-4 w-4 rounded-full border border-solid border-[#65B40E] bg-white"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className={`text-base font-medium text-[#252525] capitalize`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs font-normal text-[#101828]">
                      {step.id}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {step.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
