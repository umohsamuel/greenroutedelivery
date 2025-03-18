"use client";

import { PrimaryToSecondary2 } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav({ userName }: Readonly<{ userName: string }>) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex w-full items-center justify-between border-b bg-white px-10 py-6 lg:px-20`}
    >
      <Link href={`/`} className="hidden lg:block">
        <span className={`${PrimaryToSecondary2} text-2xl font-medium`}>
          greenroutedelivery
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <Link href={`/manage`}>
          <span
            className={`${pathname.startsWith("/manage") ? PrimaryToSecondary2 : "text-[#68706F]"} text-base font-medium`}
          >
            All Shipments
          </span>
        </Link>

        {/* <Link href={`/payments`}>
          <span
            className={`${pathname.startsWith("/payments") ? PrimaryToSecondary2 : "text-[#68706F]"} text-base font-medium`}
          >
            Payments
          </span>
        </Link> */}
      </div>

      {userName && (
        <div className="flex items-center gap-4">
          <div className="aspect-square h-10 w-10 rounded-full bg-gradient-to-r from-[#003F38] to-[#65B40E] p-px">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <span className="text-base font-bold text-[#003F38]">
                {userName[0]}
              </span>
            </div>
          </div>
          <span className="text-base font-medium text-[#333333]">
            {userName}
          </span>
        </div>
      )}
    </nav>
  );
}
