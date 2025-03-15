"use client";

import {
  createShipmentStore,
  type ShipmentStore,
  initCounterStore,
} from "@/store";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type ShipmentStoreApi = ReturnType<typeof createShipmentStore>;

export const ShipmentStoreContext = createContext<ShipmentStoreApi | undefined>(
  undefined
);

export interface ShipmentStoreProviderProps {
  children: ReactNode;
}

export const ShipmentStoreProvider = ({
  children,
}: ShipmentStoreProviderProps) => {
  const storeRef = useRef<ShipmentStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createShipmentStore(initCounterStore());
  }

  return (
    <ShipmentStoreContext.Provider value={storeRef.current}>
      {children}
    </ShipmentStoreContext.Provider>
  );
};

export const useShipmentStore = <T,>(
  selector: (store: ShipmentStore) => T
): T => {
  const shipmentStoreContext = useContext(ShipmentStoreContext);

  if (!shipmentStoreContext) {
    throw new Error(
      `useShipmentStore must be used within ShipmentStoreProvider`
    );
  }

  return useStore(shipmentStoreContext, selector);
};
