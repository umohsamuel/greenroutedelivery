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

export const shipmentStatuses = [
  { label: "Order Received", value: "order-received" },
  { label: "Awaiting Pickup", value: "awaiting-pickup" },
  { label: "Picked Up", value: "picked-up" },
  { label: "In Transit", value: "in-transit" },
  {
    label: "Arrived at Sorting Facility",
    value: "arrived-at-sorting-facility",
  },
  {
    label: "Departed from Sorting Facility",
    value: "departed-from-sorting-facility",
  },
  { label: "Out for Delivery", value: "out-for-delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Delivery Attempted", value: "delivery-attempted" },
  { label: "Failed Delivery", value: "failed-delivery" },
  { label: "Address Issue", value: "address-issue" },
  { label: "Held at Customs", value: "held-at-customs" },
  { label: "Delayed", value: "delayed" },
  { label: "Damaged in Transit", value: "damaged-in-transit" },
  { label: "Cancelled", value: "cancelled" },
] as const;
