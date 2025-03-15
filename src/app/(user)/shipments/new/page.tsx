import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check } from "lucide-react";

export default function NewShipment() {
  return (
    <div className="px-[5%] py-12">
      <div>
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

        <div className="mt-10 border-r border-solid border-[#DADADA]">
          <ShippingFormStatus />
        </div>
      </div>
      <div></div>
    </div>
  );
}

const ShippingFormStatus = () => {
  return (
    <div className="w-full">
      <div className="relative">
        {shippingFormSteps.map((step, index) => (
          <ShippingStepItem
            key={step}
            completedStep={index === 0}
            isCurrentStep={true}
            index={index}
            title={step}
          />
        ))}
      </div>
    </div>
  );
};

const shippingFormSteps = [
  "Sender Information",
  "Recipient Information",
  "Package Details",
  "Delivery Preferences",
];

const ShippingStepItem = ({
  title,
  index,
  isCurrentStep,
  completedStep,
}: {
  index: number;
  title: string;
  isCurrentStep: boolean;
  completedStep: boolean;
}) => {
  return (
    <div className="relative mb-8 flex gap-4">
      {index < shippingFormSteps.length - 1 && (
        <div className="absolute top-7 left-[10px] z-[51] h-full w-[1px] -translate-x-[50%] bg-[#929292]"></div>
      )}

      <div className="relative z-[52] mt-1 mr-4">
        {completedStep ? (
          <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full border border-solid border-[#65B40E] bg-[#65B40E]">
            <Check color="white" size={10} />
          </div>
        ) : isCurrentStep ? (
          <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full border border-solid border-[#4B5563] bg-white">
            <div className="w-h-1 aspect-square h-1 rounded-full bg-[#091011]"></div>
          </div>
        ) : (
          <div className="aspect-square h-5 w-5 rounded-full border border-solid border-[#65B40E] bg-white"></div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-base font-medium text-[#252525]`}>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
