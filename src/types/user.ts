import { Role } from "./auth";

export interface UserResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: string;
    __v: number;
  };
}

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

interface ShipmentStatus {
  shipment: DeliveryStatus;
  _id: string;
  timestamp: string;
}

interface Shipment {
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

export interface ShipmentsResponse {
  success: boolean;
  count: number;
  data: Shipment[];
}

export interface AShipmentResponse {
  success: boolean;
  data: Shipment;
}

interface ShipmentResponse {
  user: string;
  source: Address;
  destination: Address;
  packageDetails: PackageDetails;
  status: DeliveryStatus;
  paymentStatus: PaymentStatus;
  shipmentType: ShipmentType;
  _id: string;
  trackingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AddShipmentResponse {
  success: boolean;
  data: ShipmentResponse;
}
