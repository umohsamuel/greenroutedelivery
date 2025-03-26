import AdminShipmentTable from "@/components/table/admin-shipment-table";

export default async function ManageShipments() {
  return (
    <div className="px-[5%] py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-[40px] font-bold">Manage Shipments</h1>
          <p>View and manage all shipments from users.</p>
        </div>
      </div>

      <div className="mt-10">
        <AdminShipmentTable />
      </div>
    </div>
  );
}
