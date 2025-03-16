import { PrimaryToSecondary2 } from "@/lib";
import Link from "next/link";

export function AuthNav() {
  return (
    <nav
      className={`flex w-full justify-center border-b bg-white px-10 py-6 lg:px-20`}
    >
      <Link href={`/`}>
        <span className={`${PrimaryToSecondary2} text-2xl font-medium`}>
          greenroutedelivery
        </span>
      </Link>
    </nav>
  );
}
