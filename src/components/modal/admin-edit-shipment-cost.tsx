"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAmount } from "@/server/functions/admin.client";
import { DeliveryStatus } from "@/types";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export function AdminEditShipmentCost({
  deliveryStatus,
  tracking_id,
  shipment_id,
}: {
  deliveryStatus: DeliveryStatus;
  tracking_id: string;
  shipment_id: string;
}) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    await updateAmount(shipment_id, { amount: totalCost })
      .then((res) => {
        if (res.data) {
          if (res.data.success) {
            toast.success("Shipment cost updated successfully");
            router.refresh();
            closeRef.current?.click();
          } else {
            toast.error(res.error || "Failed to update shipment cost");
          }
        } else {
          toast.error(res.error ?? "An error occurred");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Shipment Cost</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col text-base text-[#252525]">
            <h4 className="font-light">Tracking ID</h4>
            <p className="text-2xl font-medium">{tracking_id}</p>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-base font-normal text-[#34C759] capitalize`}
          >
            <div
              className={`aspect-square h-2 w-2 rounded-full bg-[#34C759]`}
            />
            {deliveryStatus}
          </div>
        </div>

        <div className="space-y-1.5 text-base">
          <Label htmlFor="total_cost" className="font-light">
            Total cost
          </Label>
          <Input
            id="total_cost"
            name="total_cost"
            type="number"
            placeholder="$0.00"
            className="h-14 w-full"
            required
            value={totalCost}
            onChange={(e) =>
              setTotalCost(e.target.value ? parseFloat(e.target.value) : 0)
            }
          />
        </div>

        <DialogFooter className="mt-6">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="h-14 w-40 bg-[#003F38] px-12"
          >
            <Check size={20} />
            <span className="textGradient">
              {" "}
              {isSubmitting ? "..." : "Save"}
            </span>
          </Button>
          <DialogClose ref={closeRef} className="sr-only" asChild>
            <button type="button"></button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
