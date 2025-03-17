import { zodResolver } from "@hookform/resolvers/zod";
import { useShipmentStore } from "@/providers/zustand";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Check } from "lucide-react";
import { FormInputItem } from "../input";
import {
  deliveryPrefArr,
  DeliveryPrefInputs,
  deliveryPrefSchema,
  packageInfoArr,
  PackageInfoInputs,
  packageInfoSchema,
  recipientInfoArr,
  RecipientInfoInputs,
  recipientInfoSchema,
  senderInfoArr,
  SenderInfoInputs,
  senderInfoSchema,
} from "@/schemas";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShipmentType } from "@/types";
import { useEffect } from "react";

export const SenderInfoForm = () => {
  const currentStep = useShipmentStore((state) => state.currentFormStep);
  const setCurrentStep = useShipmentStore((state) => state.setCurrentFormStep);
  const setNewShipment = useShipmentStore((state) => state.setNewShipment);

  const form = useForm<z.infer<typeof senderInfoSchema>>({
    resolver: zodResolver(senderInfoSchema),
    defaultValues: {
      fullname: "",
      phone_no: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof senderInfoSchema>) => {
    console.log(data);
    setNewShipment({
      source: {
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
      },
    });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="w-full max-w-[480px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">Sender Information</h2>
            <p className="text-base font-light text-[#252525]">
              Enter details about the sender for a smooth pickup process.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {senderInfoArr.map((input, index) => (
              <FormInputItem<SenderInfoInputs>
                className={`${index > 1 ? "col-span-1" : "col-span-2"}`}
                key={input.name}
                input={input}
                form={form}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="h-[60px] bg-[#003F38] px-12">
              <span className="textGradient">Continue</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const RecipientInfoForm = () => {
  const currentStep = useShipmentStore((state) => state.currentFormStep);
  const setCurrentStep = useShipmentStore((state) => state.setCurrentFormStep);
  const setNewShipment = useShipmentStore((state) => state.setNewShipment);

  const form = useForm<z.infer<typeof recipientInfoSchema>>({
    resolver: zodResolver(recipientInfoSchema),
    defaultValues: {
      fullname: "",
      phone_no: "",
      country: "",
      state: "",
      city: "",
      address: "",
      delivery_instructions: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof recipientInfoSchema>) => {
    console.log(data);
    setNewShipment({
      destination: {
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
      },
    });

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="w-full max-w-[480px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">Recipient Information</h2>
            <p className="text-base font-light text-[#252525]">
              Provide recipient details for accurate delivery
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {recipientInfoArr.map((input, index) => (
              <FormInputItem<RecipientInfoInputs>
                className={`${index > 1 && index < 6 ? "col-span-1" : "col-span-2"}`}
                key={input.name}
                input={input}
                form={form}
              />
            ))}
          </div>

          <div className="flex w-full justify-between">
            <Button
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
              type="submit"
              className="h-[60px] bg-transparent px-12 text-lg font-medium text-[#6B6B6B]"
            >
              <ArrowLeft color="#6B6B6B" size={20} />
              <span>Previous</span>
            </Button>

            <Button type="submit" className="h-[60px] bg-[#003F38] px-12">
              <span className="textGradient">Continue</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const PackageDetailsForm = () => {
  const currentStep = useShipmentStore((state) => state.currentFormStep);
  const setCurrentStep = useShipmentStore((state) => state.setCurrentFormStep);
  const setNewShipment = useShipmentStore((state) => state.setNewShipment);

  const form = useForm<z.infer<typeof packageInfoSchema>>({
    resolver: zodResolver(packageInfoSchema),
    defaultValues: {
      weight: "",
      length: "",
      width: "",
      height: "",
      handling_instructions: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof packageInfoSchema>) => {
    console.log(data);
    setNewShipment({
      packageDetails: {
        dimensions: {
          height: parseInt(data.height),
          width: parseInt(data.width),
          length: parseInt(data.length),
        },
        weight: parseInt(data.weight),
      },
    });

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="w-full max-w-[480px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">Package Details</h2>
            <p className="text-base font-light text-[#252525]">
              Describe your package for proper handling
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {packageInfoArr.map((input) => (
              <FormInputItem<PackageInfoInputs>
                key={input.name}
                input={input}
                form={form}
              />
            ))}
          </div>

          <div className="flex w-full justify-between">
            <Button
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
              type="submit"
              className="h-[60px] bg-transparent px-12 text-lg font-medium text-[#6B6B6B]"
            >
              <ArrowLeft color="#6B6B6B" size={20} />
              <span>Previous</span>
            </Button>

            <Button type="submit" className="h-[60px] bg-[#003F38] px-12">
              <span className="textGradient">Continue</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const DeliveryPreferencesForm = () => {
  const currentStep = useShipmentStore((state) => state.currentFormStep);
  const setCurrentStep = useShipmentStore((state) => state.setCurrentFormStep);
  const setNewShipment = useShipmentStore((state) => state.setNewShipment);

  const form = useForm<z.infer<typeof deliveryPrefSchema>>({
    resolver: zodResolver(deliveryPrefSchema),
    defaultValues: {
      delivery_type: "",
    },
  });

  const deliveryType = form.watch("delivery_type");

  useEffect(() => {
    if (deliveryType) {
      setNewShipment({ shipmentType: deliveryType as ShipmentType });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryType]);

  const onSubmit = async (data: z.infer<typeof deliveryPrefSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-[480px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-2xl font-bold">Delivery Preferences</h2>
            <p className="text-base font-light text-[#252525]">
              Choose how you want your package delivered
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {deliveryPrefArr.map((input) => (
              <FormInputItem<DeliveryPrefInputs>
                key={input.name}
                input={input}
                form={form}
              />
            ))}
          </div>

          <div className="flex w-full justify-between">
            <Button
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}
              type="submit"
              className="h-[60px] bg-transparent px-12 text-lg font-medium text-[#6B6B6B]"
            >
              <ArrowLeft color="#6B6B6B" size={20} />
              <span>Previous</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const FinalStep = () => {
  return (
    <div className="flex w-full max-w-[480px] flex-col items-center gap-12 text-center">
      <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#003F38] to-[#65B40E]">
        <Check size={32} color="white" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-normal">
          Tracking ID: <span className="font-bold">#123456789</span>
        </p>

        <p>
          Your package is now registered for delivery. To complete your
          shipment, please send this Tracking ID to our payment processing email{" "}
          <a
            href="mailto:payments@greenroutedelivery.com"
            target="_blank"
            className="text-[#65B40E]"
          >
            payments@greenroutedelivery.com
          </a>
        </p>
      </div>

      <Link
        href={`/shipments`}
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-[60px] w-fit bg-[#003F38] px-12"
        )}
      >
        <span className="textGradient">See shipments</span>
      </Link>
    </div>
  );
};
