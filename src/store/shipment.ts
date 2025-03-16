import { createStore } from "zustand/vanilla";

export type ShipmentState = {
  currentFormStep: number;
};

export type ShipmentActions = {
  setCurrentFormStep: (step: number) => void;
};

export type ShipmentStore = ShipmentState & ShipmentActions;

export const initCounterStore = (): ShipmentState => {
  return { currentFormStep: 0 };
};

export const defaultInitState: ShipmentState = {
  currentFormStep: 0,
};

export const createShipmentStore = (
  initState: ShipmentState = defaultInitState
) => {
  return createStore<ShipmentStore>()((set) => ({
    ...initState,
    setCurrentFormStep: (step: number) => set({ currentFormStep: step }),
  }));
};
