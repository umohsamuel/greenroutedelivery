import { PropsWithChildren } from "react";
import { ShipmentStoreProvider } from "./zustand";

export default function Providers({ children }: PropsWithChildren) {
  return <ShipmentStoreProvider>{children}</ShipmentStoreProvider>;
}
