import {
  Address,
  DeliveryStatus,
  PaymentStatus,
  Shipment,
  ShipmentStatus,
} from "./shipment";

interface Pagination {
  prev?: {
    page: number;
    limit: number;
  };
}

export interface AllShipmentsResponse {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: Shipment[];
}

export interface TrackShipmentResponse {
  success: boolean;
  data: TrackShipmentResponseData;
}

export interface TrackShipmentResponseData {
  id: string;
  trackingId: string;
  status: DeliveryStatus;
  payment: PaymentStatus;
  source: Address;
  destination: Address;
  createdAt: string;
  updatedAt: string;
  updatedStatus: ShipmentStatus[];
  amount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  createdAt: string;
  __v: number;
}

export interface AllUsersResponse {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: User[];
}
