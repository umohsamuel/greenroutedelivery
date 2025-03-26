"use client";

import { adminUsersColumn } from "@/lib/admin";
import { DataTable } from "./shipments";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils";
import { LoaderCircle } from "lucide-react";
import { getAllUsers } from "@/server/functions/admin.client";

export default function AdminUsersTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsersAdmin", search, page, limit],
    queryFn: () => getAllUsers(page, limit, search),
  });

  // const usersData = aait getAllUsers();

  console.log({ usersData });

  const parsedShipmentsData =
    usersData && usersData.data?.success
      ? usersData.data.data.map((sm) => ({
          id: sm._id,
          name: sm.name,
          email: sm.email ?? "N/A",
          role: sm.role,
          dateCreated: formatDate(sm.createdAt),
        }))
      : [];

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

  return (
    <>
      <DataTable
        paginationType="server"
        columns={adminUsersColumn}
        data={parsedShipmentsData}
        title="Manage Users"
        filterKey="name"
        onFilterChange={onFilterChange}
        page={page}
        pageSize={limit}
        setPage={setPage}
        setPageSize={setLimit}
      />
    </>
  );
}
