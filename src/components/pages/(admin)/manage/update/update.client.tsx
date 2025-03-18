"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shipmentStatuses } from "@/lib/shipping";

import { useState } from "react";
import { DeliveryStatus, TrackShipmentResponseData } from "@/types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/utils";

export default function UpdateShipmentClient({
  shipmentStatus,
}: {
  shipmentStatus: TrackShipmentResponseData;
}) {
  const [selectedStep, setSelectedStep] = useState<DeliveryStatus | "">("");

  const statusSteps = shipmentStatus.updatedStatus.map((status) => ({
    title: status.shipment,
    completed: true,
    timestamp: `${formatDate(status.timestamp)} ${formatTime(status.timestamp)}`,
  }));

  return (
    <div className="mt-6 flex justify-between">
      <div className="flex w-full flex-col gap-1.5 lg:max-w-[45%]">
        <Label className="text-base font-light">Next Step</Label>
        <Select
          value={selectedStep}
          onValueChange={(value) => setSelectedStep(value as DeliveryStatus)}
        >
          <SelectTrigger className="!h-14 w-full lg:max-w-[448px]">
            <SelectValue placeholder="Select the next step" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select the next step</SelectLabel>
              {shipmentStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="mt-[18px] h-10 w-fit bg-[#65B40E] !px-8">
          Apply
        </Button>
      </div>

      <div className="w-full lg:max-w-[45%]">
        <Label className="text-sm font-bold text-[#545454]">History</Label>
        <TrackingStatus statusSteps={statusSteps} />
      </div>
    </div>
  );
}

interface TrackingStatusProps {
  statusSteps?: {
    title: string;
    completed: boolean;
    timestamp: string;
  }[];
}

const TrackingStatus = ({ statusSteps }: TrackingStatusProps) => {
  return (
    <div className="w-full py-5">
      <div className="relative">
        {statusSteps && statusSteps.length < 1 && (
          <p className="text-center text-base font-normal text-gray-400">
            No status updates yet.
          </p>
        )}
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
