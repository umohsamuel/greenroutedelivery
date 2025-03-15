import {
  DeliveryPreferencesForm,
  FinalStep,
  PackageDetailsForm,
  RecipientInfoForm,
  SenderInfoForm,
} from "@/components/stepper";

export const shippingFormSteps = [
  "Sender Information",
  "Recipient Information",
  "Package Details",
  "Delivery Preferences",
];

export const steps = [
  <SenderInfoForm key="SenderInfoForm" />,
  <RecipientInfoForm key="RecipientInfoForm" />,
  <PackageDetailsForm key="PackageDetailsForm" />,
  <DeliveryPreferencesForm key="DeliveryPreferencesForm" />,
  <FinalStep key="FinalStep" />,
];
