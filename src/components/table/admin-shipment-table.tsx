"use client";

import { DataTable } from "./shipments";
// import { useState } from "react";
import { adminColumns } from "@/lib/admin";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils";
import { LoaderCircle } from "lucide-react";
import { getAllShipments } from "@/server/functions/admin.client";

export default function AdminShipmentTable() {
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

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: shipmentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allShipmentsAdmin", search, page, limit],
    queryFn: () => getAllShipments(page, limit),
  });

  function onFilterChange(value: string) {
    setSearch(value);
  }

  if (isLoading) {
    return (
      <div className="flex w-full animate-spin justify-center">
        <LoaderCircle size={28} color="#65B40E" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center">An error occurred</p>;
  }

  console.log({ shipmentsData });

  const parsedShipmentsData =
    shipmentsData && shipmentsData.data?.success
      ? shipmentsData.data.data.map((sm) => ({
          id: sm._id,
          tracking_id: sm.trackingId,
          amount: sm.amount ?? "N/A",
          status: sm.paymentStatus,
          dateCreated: formatDate(sm.createdAt),
          pickupLocation: `${sm.source.address}, ${sm.source.city}, ${sm.source.state}, ${sm.source.country}`,
          destination: `${sm.destination.address}, ${sm.destination.city}, ${sm.destination.state}, ${sm.destination.country}`,
          deliveryStatus: sm.status,
        }))
      : [];

  return (
    <>
      <DataTable
        paginationType="server"
        columns={adminColumns}
        data={parsedShipmentsData}
        onFilterChange={onFilterChange}
        page={page}
        pageSize={limit}
        setPage={setPage}
        setPageSize={setLimit}
      />
    </>
  );
}
