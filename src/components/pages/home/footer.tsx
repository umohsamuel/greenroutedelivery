import { PrimaryToSecondary2 } from "@/lib";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className={`mt-20 flex w-full bg-[#F7F7F7] px-4 md:items-center md:justify-center`}
    >
      <div className={`w-full max-w-[85%] space-y-10 py-15 md:text-center`}>
        <div
          className={`flex w-full flex-col border-b py-6 md:flex-row md:justify-between`}
        >
          <div>
            <span className={`${PrimaryToSecondary2} text-2xl font-medium`}>
              greenroutedelivery
            </span>
          </div>
          <div
            className={`flex flex-col space-x-8 md:flex-row md:items-center`}
          >
            <Link href={`/`} className={`${PrimaryToSecondary2}`}>
              Home
            </Link>
            <Link href={`/`} className={`text-lp-disabled`}>
              How it works
            </Link>
            <Link href={`/`} className={`text-lp-disabled`}>
              Contact
            </Link>
          </div>
        </div>
        <p className={`text-[#68706F]`}>
          Copyright @2023 Aspire. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
