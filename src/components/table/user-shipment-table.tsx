"use client";

import { userColumns } from "@/lib/users";
import { ShipmentDetails } from "../modal/shipment-details";
import { DataTable } from "./shipments";
import { TShipment } from "@/types";
import { useState } from "react";

export default function UserShipmentTable({ data }: { data: TShipment[] }) {
  const [openShipmentDetails, setOpenShipmentDetails] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<TShipment | null>(
    null
  );

  function handleCloseShipmentDetails() {
    setOpenShipmentDetails(false);
  }

  function handleRowClick(row: TShipment) {
    setOpenShipmentDetails(true);
    setSelectedShipment(row);
  }

  return (
    <>
      <DataTable
        paginationType="client"
        columns={userColumns}
        data={data}
        onRowClick={handleRowClick}
      />

      <ShipmentDetails
        isOpen={openShipmentDetails}
        onClose={handleCloseShipmentDetails}
        shipment={selectedShipment}
      />
    </>
  );
}
