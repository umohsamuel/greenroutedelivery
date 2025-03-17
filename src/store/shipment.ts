import { defaultNewShipmentData } from "@/lib/users";
import { AddShipmentInputs } from "@/server/actions/user";
import { createStore } from "zustand/vanilla";

export type ShipmentState = {
  currentFormStep: number;
  newShipment: AddShipmentInputs;
};

export type ShipmentActions = {
  setCurrentFormStep: (step: number) => void;
  setNewShipment: (shipment: Partial<AddShipmentInputs>) => void;
};

export type ShipmentStore = ShipmentState & ShipmentActions;

export const initCounterStore = (): ShipmentState => {
  return { currentFormStep: 0, newShipment: defaultNewShipmentData };
};

export const defaultInitState: ShipmentState = {
  currentFormStep: 0,
  newShipment: defaultNewShipmentData,
};

export const createShipmentStore = (
  initState: ShipmentState = defaultInitState
) => {
  return createStore<ShipmentStore>()((set, get) => ({
    ...initState,
    setCurrentFormStep: (step: number) => set({ currentFormStep: step }),
    setNewShipment: (shipment: Partial<AddShipmentInputs>) =>
      set({ newShipment: { ...get().newShipment, ...shipment } }),
  }));
};
