import { PrimaryToSecondary2, WhiteToSecondary } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function Join() {
  return (
    <section
      className={`relative my-15 hidden w-full max-w-[90%] px-8 sm:block lg:max-w-[85%]`}
    >
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
        <h1
          className={`${WhiteToSecondary} text-2xl font-bold sm:text-3xl md:text-4xl xl:text-6xl`}
        >
          Join Us in Making a Difference!
        </h1>
        <p className={`flex flex-col text-white sm:text-lg lg:text-xl`}>
          <span>
            Whether you&#39;re sending a small parcel or a large package, choose
            a
          </span>
          <span>delivery service that cares for the environment.</span>
        </p>
        <Link
          href={`/signup`}
          className={`mt-4 flex gap-2.5 rounded-lg bg-white px-12 py-4 lg:mt-12`}
        >
          📦{" "}
          <span className={`${PrimaryToSecondary2} font-medium lg:text-xl`}>
            Get Started Today
          </span>{" "}
        </Link>
      </div>
      <Image
        src={`/lp-icons/leaf2.png`}
        alt={`grid`}
        width={132}
        height={70}
        className={`absolute right-40 bottom-15 hidden lg:block`}
      />
    </section>
  );
}
