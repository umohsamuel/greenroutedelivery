import Link from "next/link";
import { PrimaryToSecondary2, WhiteToSecondary } from "../utils/customStyles";

export default function Nav() {
  return (
    <nav className={`sm:flex hidden justify-between px-10 lg:px-20 py-6 border-b w-full`}>
      <div>
        <span className={`${PrimaryToSecondary2} font-medium text-2xl`}>greenroutedelivery</span>
      </div>
      <div className={`space-x-8 hidden lg:flex items-center`}>
        <Link href={`/`} className={`${PrimaryToSecondary2}`}>
          Home
        </Link>
        <Link href={`/`} className={`text-lp-disabled`}>How it works</Link>
      </div>
      <div>
        <Link href={`/signup`} className={`bg-lp-primary rounded-lg px-4 py-3`}>
          <span className={`${WhiteToSecondary} font-bold`}>Get Started</span>
        </Link>
      </div>
    </nav>
  );
}
