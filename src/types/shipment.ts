export type Shipment = {
  id: string;
  amount: number;
  status: "pending" | "successful" | "failed";
  dateCreated: string;
  pickupLocation: string;
  destination: string;
  estimatedDelivery: string;
  deliveryStatus: "cancelled" | "in-transit" | "delivered";
};
