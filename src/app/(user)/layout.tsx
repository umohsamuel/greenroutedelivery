import { UserNav } from "@/components/pages/(user)";
import { getUserInfo } from "@/server/functions";
import { PropsWithChildren } from "react";

export default async function UserDasboardLayout({
  children,
}: PropsWithChildren) {
  const userInfo = await getUserInfo();

  return (
    <div>
      <UserNav
        userName={userInfo.data?.success ? userInfo.data.data.name : ""}
      />
      {children}
    </div>
  );
}
