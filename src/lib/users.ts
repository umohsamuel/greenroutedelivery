import { ShipmentType } from "@/types";

export const defaultNewShipmentData = {
  shipmentType: "" as ShipmentType,
  packageDetails: {
    dimensions: {
      height: 0,
      width: 0,
      length: 0,
    },
    weight: 0,
  },
  destination: {
    country: "",
    state: "",
    city: "",
    address: "",
  },
  source: {
    country: "",
    state: "",
    city: "",
    address: "",
  },
};
