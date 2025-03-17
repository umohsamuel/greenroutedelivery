import { PrimaryToSecondary2 } from "@/lib";
import Link from "next/link";

export function UserNav({ userName }: Readonly<{ userName: string }>) {
  return (
    <nav
      className={`flex w-full items-center justify-between border-b bg-white px-10 py-6 lg:px-20`}
    >
      <Link href={`/`} className="hidden lg:block">
        <span className={`${PrimaryToSecondary2} text-2xl font-medium`}>
          greenroutedelivery
        </span>
      </Link>

      <Link href={`/shipments`}>
        <span className={`${PrimaryToSecondary2} text-base font-medium`}>
          My shipments
        </span>
      </Link>

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
