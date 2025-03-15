import { z } from "zod";

// ----------------------------------------------------------

export type SenderInfoInputs = z.infer<typeof senderInfoSchema>;

export const senderInfoArr = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "Full name",
    name: "fullname" as const,
  },
  {
    label: "Phone Number",
    type: "number",
    placeholder: "Phone Number",
    name: "phone_no" as const,
  },
  {
    label: "Pickup Address",
    type: "text",
    placeholder: "Pickup Address",
    name: "pickup_address" as const,
  },
];

export const senderInfoSchema = z.object({
  fullname: z.string().nonempty("Full name is required"),
  phone_no: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
  pickup_address: z.string().nonempty("Pickup address is required"),
});

// ----------------------------------------------------------

export const recipientInfoSchema = z.object({
  fullname: z.string().nonempty("Full name is required"),
  phone_no: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
  delivery_address: z.string().nonempty("Pickup address is required"),
  delivery_instructions: z.string().optional(),
});

export type RecipientInfoInputs = z.infer<typeof recipientInfoSchema>;

export const recipientInfoArr = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname" as const,
    placeholder: "Full name",
  },
  {
    label: "Phone Number",
    type: "number",
    placeholder: "Phone Number",
    name: "phone_no" as const,
  },
  {
    label: "Delivery Address",
    type: "text",
    placeholder: "Delivery Address",
    name: "delivery_address" as const,
  },
  {
    label: "Additional Delivery Instructions (Optional)",
    type: "textarea",
    placeholder: "E.g Notify me 30mins before delivery",
    name: "delivery_instructions" as const,
  },
];

// ----------------------------------------------------------

export const packageInfoSchema = z.object({
  weight: z.string().nonempty("Weight is required"),
  length: z.string().nonempty("Length is required"),
  width: z.string().nonempty("Width is required"),
  height: z.string().nonempty("Height is required"),
  handling_instructions: z.string().optional(),
});

export type PackageInfoInputs = z.infer<typeof packageInfoSchema>;

export const packageInfoArr = [
  {
    label: "Package Weight in (kg)",
    type: "number",
    placeholder: "Package Weight in (kg)",
    name: "weight" as const,
  },
  {
    label: "Length in (inches)",
    type: "number",
    placeholder: "Length in (inches)",
    name: "length" as const,
  },
  {
    label: "Width in (inches)",
    type: "number",
    placeholder: "Width in (inches)",
    name: "width" as const,
  },
  {
    label: "Height in (inches)",
    type: "number",
    placeholder: "Height in (inches)",
    name: "height" as const,
  },
  {
    label: "Special Handling Instructions (Optional)",
    type: "textarea",
    placeholder: "E.g Notify me 30mins before delivery",
    name: "handling_instructions" as const,
  },
];

// ----------------------------------------------------------

export const deliveryPrefSchema = z.object({
  delivery_type: z.string().nonempty("Delivery Type is required"),
});

export type DeliveryPrefInputs = z.infer<typeof deliveryPrefSchema>;

const deliveryTypeOptions = [
  { label: "Standard", value: "standard" },
  { label: "Express", value: "express" },
];

export const deliveryPrefArr = [
  {
    label: "Delivery Type",
    type: "select",
    placeholder: "Delivery Type",
    name: "delivery_type" as const,
    options: deliveryTypeOptions,
  },
];

// ----------------------------------------------------------
