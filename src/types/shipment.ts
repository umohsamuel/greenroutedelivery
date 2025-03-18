export type ShipmentType = "express" | "standard";

export type PaymentStatus = "pending" | "successful";

export type DeliveryStatus =
  | "order-received"
  | "awaiting-pickup"
  | "picked-up"
  | "in-transit"
  | "arrived-at-sorting-facility"
  | "departed-from-sorting-facility"
  | "out-for-delivery"
  | "delivered"
  | "delivery-attempted"
  | "failed-delivery"
  | "address-issue"
  | "held-at-customs"
  | "delayed"
  | "damaged-in-transit"
  | "cancelled";

interface Dimensions {
  height: number;
  width: number;
  length: number;
}

export interface PackageDetails {
  dimensions: Dimensions;
  weight: number;
}

export interface Address {
  country: string;
  state: string;
  city: string;
  address: string;
}

export interface ShipmentStatus {
  shipment: DeliveryStatus;
  _id: string;
  timestamp: string;
}

export type TShipment = {
  id: string;
  tracking_id: string;
  amount: string;
  status: PaymentStatus;
  dateCreated: string;
  pickupLocation: string;
  destination: string;
  deliveryStatus: DeliveryStatus;
};

export interface Shipment {
  source: Address;
  destination: Address;
  packageDetails: PackageDetails;
  _id: string;
  user: string;
  status: DeliveryStatus;
  paymentStatus: PaymentStatus;
  shipmentType: ShipmentType;
  amount: string;
  updatedStatus: ShipmentStatus[];
  trackingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
