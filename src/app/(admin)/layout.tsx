import { AdminNav } from "@/components/pages/(admin)";
import { getUserInfo } from "@/server/functions";
import { PropsWithChildren } from "react";

export default async function AdminDasboardLayout({
  children,
}: PropsWithChildren) {
  const userInfo = await getUserInfo();

  return (
    <div>
      <AdminNav
        userName={userInfo.data?.success ? userInfo.data.data.name : ""}
      />
      {children}
    </div>
  );
}
