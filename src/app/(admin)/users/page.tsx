import AdminUsersTable from "@/components/table/admin-users-table";

export default function ManageUsers() {
  return (
    <div className="px-[5%] py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-[40px] font-bold">Manage Users</h1>
          <p>View and manage all users.</p>
        </div>
      </div>

      <div className="mt-10">
        <AdminUsersTable />
      </div>
    </div>
  );
}
