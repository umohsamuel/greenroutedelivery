"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useShipmentStore } from "@/providers/zustand";
import { Stepper } from "@/components/stepper";
import { shippingFormSteps, steps } from "@/lib/shipping";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NewShipment() {
  const currentStep = useShipmentStore((state) => state.currentFormStep);
  const setCurrentStep = useShipmentStore((state) => state.setCurrentFormStep);

  function handleFinalSubmit() {
    setCurrentStep(currentStep + 1);
    console.log("big boy clicked");
  }

  return (
    <div className="px-[5%] lg:h-screen lg:overflow-hidden lg:px-0">
      <div className="flex h-full flex-col pt-12 lg:flex-row lg:justify-between lg:pl-[5%]">
        <div className="w-full lg:max-w-[25%]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/shipments">My shipments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add new shipment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold">Add new shipment</h1>

          <div className="mt-10 border-solid border-[#DADADA] lg:border-r">
            <Stepper steps={shippingFormSteps} />
          </div>
        </div>

        <div className="h-full w-full pb-12 lg:max-w-[75%] lg:overflow-y-auto lg:pr-[5%] lg:pl-[5%]">
          {currentStep < 4 && (
            <div className="hidden items-center justify-end gap-2 lg:flex">
              <Link
                href="/shipments"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "border border-solid border-[#DADADA] bg-transparent px-6 py-3 text-[#CACACA]"
                )}
              >
                Cancel
              </Link>

              <Button
                disabled={currentStep < shippingFormSteps.length - 1}
                className="bg-[#003F38] px-6 py-3"
                onClick={handleFinalSubmit}
              >
                <Check color="white" size={20} />
                <span className="textGradient">Confirm Shipment</span>
              </Button>
            </div>
          )}

          <div className="mt-10 flex justify-center lg:mt-20">
            {steps[currentStep]}
          </div>

          {currentStep < 4 && (
            <div className="mt-10 flex items-center gap-2 lg:hidden">
              <Link
                href="/shipments"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "border border-solid border-[#DADADA] bg-transparent px-6 py-3 text-[#CACACA]"
                )}
              >
                Cancel
              </Link>

              <Button
                disabled={currentStep < shippingFormSteps.length - 1}
                className="grow bg-[#003F38] px-6 py-3"
                onClick={handleFinalSubmit}
              >
                <Check color="white" size={20} />
                <span className="textGradient">Confirm Shipment</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
