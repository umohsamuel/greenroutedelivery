"use client";

import { DataTable } from "./shipments";
import { TShipment } from "@/types";
// import { useState } from "react";
import { adminColumns } from "@/lib/admin";

export default function AdminShipmentTable({ data }: { data: TShipment[] }) {
  // const [openShipmentDetails, setOpenShipmentDetails] = useState(false);
  // const [selectedShipment, setSelectedShipment] = useState<TShipment | null>(
  //   null
  // );

  // function handleCloseShipmentDetails() {
  //   setOpenShipmentDetails(false);
  // }

  // function handleRowClick(row: TShipment) {
  //   setOpenShipmentDetails(true);
  //   setSelectedShipment(row);
  // }

  return (
    <>
      <DataTable
        columns={adminColumns}
        data={data}
        // onRowClick={handleRowClick}
      />
    </>
  );
}
