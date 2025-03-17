import { DeliveryStatus, PaymentStatus } from "./user";

export type Shipment = {
  id: string;
  tracking_id: string;
  amount: string;
  status: PaymentStatus;
  dateCreated: string;
  pickupLocation: string;
  destination: string;
  deliveryStatus: DeliveryStatus;
};
