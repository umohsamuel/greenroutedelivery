import { PropsWithChildren } from "react";
import { ShipmentStoreProvider } from "./zustand";
import QueryClientProv from "./queryClient";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProv>
      <ShipmentStoreProvider>{children}</ShipmentStoreProvider>
    </QueryClientProv>
  );
}
