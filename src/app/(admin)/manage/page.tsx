import AdminShipmentTable from "@/components/table/admin-shipment-table";
import { getAllShipments } from "@/server/functions";
import { formatDate } from "@/utils";

export default async function ManageShipments() {
  const shipmentsData = await getAllShipments();

  console.log({ shipmentsData });

  const parsedShipmentsData = shipmentsData.data?.success
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
    <div className="px-[5%] py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-[40px] font-bold">Manage Shipments</h1>
          <p>View and manage all shipments from users.</p>
        </div>
      </div>

      <div className="mt-10">
        <AdminShipmentTable data={parsedShipmentsData} />
      </div>
    </div>
  );
}
