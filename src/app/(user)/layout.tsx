import { UserNav } from "@/components/pages/(user)";
import { PropsWithChildren } from "react";

export default function UserDasboardLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <UserNav />
      {children}
    </div>
  );
}
