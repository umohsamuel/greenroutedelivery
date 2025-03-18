import { Role } from "./auth";
import {
  Address,
  DeliveryStatus,
  PackageDetails,
  PaymentStatus,
  Shipment,
  ShipmentType,
} from "./shipment";

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
