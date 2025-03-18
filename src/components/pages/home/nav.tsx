import { PrimaryToSecondary2, WhiteToSecondary } from "@/lib";
import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className={`hidden w-full justify-between border-b px-10 py-6 sm:flex lg:px-20`}
    >
      <div>
        <span className={`${PrimaryToSecondary2} text-2xl font-medium`}>
          greenroutedelivery
        </span>
      </div>
      <div className={`hidden items-center space-x-8 lg:flex`}>
        <Link href={`/`} className={`${PrimaryToSecondary2}`}>
          Home
        </Link>
        {/* <Link href={`/`} className={`text-lp-disabled`}>
          How it works
        </Link> */}
      </div>
      <div>
        <Link href={`/signup`} className={`bg-lp-primary rounded-lg px-4 py-3`}>
          <span className={`${WhiteToSecondary} font-bold`}>Get Started</span>
        </Link>
      </div>
    </nav>
  );
}
