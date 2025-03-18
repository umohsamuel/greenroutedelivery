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
