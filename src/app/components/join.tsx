import Image from "next/image";
import { PrimaryToSecondary2, WhiteToSecondary } from "@/app/utils/customStyles";
import Link from "next/link";

export default function Join() {
  return (
    <section className={`relative hidden sm:block w-full px-8 max-w-[90%] lg:max-w-[85%] my-15`}>
      <Image
        src={`/background/ripple.svg`}
        alt={`grid`}
        width={2143}
        height={1646}
        className={`h-full w-full rounded-xl object-cover`}
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center py-20 text-center`}
      >
        <h1 className={`${WhiteToSecondary} text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold`}>
          Join Us in Making a Difference!
        </h1>
        <p className={`flex flex-col sm:text-lg lg:text-xl text-white`}>
          <span>
            Whether you&#39;re sending a small parcel or a large package, choose
            a
          </span>
          <span>delivery service that cares for the environment.</span>
        </p>
        <Link href={`/signup`} className={`bg-white flex gap-2.5 rounded-lg px-12 py-4 mt-4 lg:mt-12`}>
          📦{" "}
          <span className={`${PrimaryToSecondary2} lg:text-xl font-medium`}>
            Get Started Today
          </span>{" "}
        </Link>
      </div>
      <Image
        src={`/lp-icons/leaf2.png`}
        alt={`grid`}
        width={132}
        height={70}
        className={`absolute hidden lg:block bottom-15 right-40`}
      />
    </section>
  );
}
