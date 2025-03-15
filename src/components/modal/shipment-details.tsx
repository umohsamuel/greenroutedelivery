"use client";

import { useStopScroll } from "@/hooks";
import { Shipment } from "@/types";
import { X } from "lucide-react";
import ReactDOM from "react-dom";

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
  useStopScroll({ isOpen });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-end bg-black/50 px-[2.5%]">
      <div className="h-[95vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white px-7 py-[22px] text-[#1F1F1F] shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-lg font-bold">Shipment Details</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {shipment ? (
          <>
            <div className="border-y border-dotted border-[#DADADA] py-5">
              <ShipmentItem
                title="Pickup Location"
                desc={shipment.pickupLocation}
              />
            </div>
            <TrackingStatus />
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

const TrackingStatus = () => {
  return (
    <div className="w-full py-5">
      <h1 className="mb-4 text-base font-medium">Tracking Status</h1>

      <div className="relative">
        {statusSteps.map((step, index) => (
          <div key={index} className="relative mb-8 flex gap-4">
            {index < statusSteps.length - 1 && (
              <div className="absolute top-6 left-[8px] z-[51] h-full w-[1px] -translate-x-[50%] bg-[#929292]"></div>
            )}

            <div className="relative z-[52] mt-1 mr-4">
              {index === 0 ? (
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
                  <h3 className={`text-base font-medium text-[#252525]`}>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-normal text-[#101828]">
                    {step.location}
                  </p>
                </div>
                <span className="text-sm text-gray-400">{step.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const statusSteps = [
  {
    title: "Picked up",
    completed: true,
    timestamp: "February 25, 2025 03:05 pm",
    location: "Location (optional)",
  },
  {
    title: "In transit",
    completed: true,
    timestamp: "February 25, 2025 03:05 pm",
    location: "Location (optional)",
  },
  {
    title: "Arrived at sorting facility",
    completed: true,
    timestamp: "February 25, 2025 03:05 pm",
    location: "Location (optional)",
  },
  {
    title: "Departed from sorting facility",
    completed: true,
    timestamp: "February 25, 2025 03:05 pm",
    location: "Location (optional)",
  },
  {
    title: "Out for delivery",
    completed: true,
    timestamp: "February 25, 2025 03:05 pm",
    location: "Location (optional)",
  },
].reverse();
