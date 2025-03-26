import { defaultNewShipmentData } from "@/lib/users";
import { AddShipmentInputs } from "@/server/actions/user";
import { AddShipmentResponse } from "@/types";
import { createStore } from "zustand/vanilla";

export type ShipmentState = {
  currentFormStep: number;
  newShipment: AddShipmentInputs;
  addShipmentResp: AddShipmentResponse | null;
};

export type ShipmentActions = {
  setCurrentFormStep: (step: number) => void;
  setNewShipment: (shipment: Partial<AddShipmentInputs>) => void;
  setAddShipmentResponse: (resp: AddShipmentResponse | null) => void;
};

export type ShipmentStore = ShipmentState & ShipmentActions;

export const initCounterStore = (): ShipmentState => {
  return {
    currentFormStep: 0,
    newShipment: defaultNewShipmentData,
    addShipmentResp: null,
  };
};

export const defaultInitState: ShipmentState = {
  currentFormStep: 0,
  newShipment: defaultNewShipmentData,
  addShipmentResp: null,
};

export const createShipmentStore = (
  initState: ShipmentState = defaultInitState
) => {
  return createStore<ShipmentStore>()((set, get) => ({
    ...initState,
    setCurrentFormStep: (step: number) => set({ currentFormStep: step }),
    setNewShipment: (shipment: Partial<AddShipmentInputs>) =>
      set({ newShipment: { ...get().newShipment, ...shipment } }),
    setAddShipmentResponse: (resp: AddShipmentResponse | null) =>
      set({ addShipmentResp: resp }),
  }));
};
