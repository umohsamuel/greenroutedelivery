import { useShipmentStore } from "@/providers/zustand";
import { Check } from "lucide-react";

export const Stepper = ({ steps }: { steps: string[] }) => {
  const currentStep = useShipmentStore((state) => state.currentFormStep);

  return (
    <div className="w-full">
      <div className="relative">
        {steps.map((step, index) => (
          <StepperItem
            key={step}
            completedStep={currentStep > index}
            isCurrentStep={currentStep === index}
            index={index}
            title={step}
            length={steps.length}
          />
        ))}
      </div>
    </div>
  );
};

const StepperItem = ({
  title,
  index,
  isCurrentStep,
  completedStep,
  length,
}: {
  index: number;
  title: string;
  isCurrentStep: boolean;
  completedStep: boolean;
  length: number;
}) => {
  return (
    <div className="relative mb-8 flex gap-4">
      {index < length - 1 && (
        <div className="absolute top-7 left-[10px] z-[51] h-full w-[1px] -translate-x-[50%] bg-[#929292]"></div>
      )}

      <div className="relative z-[52] mr-0">
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
            <h3 className={`text-sm font-normal text-[#1D3637]`}>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
