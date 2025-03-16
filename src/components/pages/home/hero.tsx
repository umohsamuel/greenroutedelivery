import { PrimaryToSecondary2, WhiteToSecondary } from "@/lib";
import Image from "next/image";

import Link from "next/link";

export default function Hero() {
  return (
    <section className={`relative flex w-full justify-center`}>
      <div className={`absolute inset-0 -z-50`}>
        <Image
          src={`/background/grid.png`}
          alt={`grid`}
          width={2143}
          height={1646}
          className={`h-full w-full object-cover`}
        />
      </div>
      <div className={`w-full px-4 sm:max-w-[90%] lg:max-w-[85%]`}>
        <div
          className={`mb-8 flex items-center justify-center pt-20 text-center`}
        >
          <article className={`max-w-7xl space-y-4`}>
            <div
              className={`${PrimaryToSecondary2} text-2xl font-bold md:text-5xl lg:text-7xl`}
            >
              <div className={`flex items-center gap-2 lg:gap-4`}>
                <div className="flex w-6 sm:w-8 md:w-12 lg:w-16">
                  <Image
                    className="object-cover"
                    src="/lp-icons/leafseed.png"
                    alt="leaf"
                    width={`283`}
                    height={`258`}
                  />
                </div>
                Eco-Friendly & Reliable
              </div>
              <h1 className={`lg:leading-24`}>Package Delivery</h1>
            </div>
            <p
              className={`flex flex-col text-xs text-[#252525] md:text-sm lg:text-lg`}
            >
              <span>
                Send and track your packages effortlessly. Request a delivery,
              </span>
              <span>and we’ll handle the rest!</span>
            </p>
          </article>
        </div>
        <div className={`mb-16 flex items-center justify-center gap-4`}>
          <Link
            href={`/signup`}
            className={`bg-lp-primary flex gap-2.5 rounded-lg px-6 py-2 sm:py-3 md:px-8 lg:px-12 lg:py-4`}
          >
            📦{" "}
            <span className={`${WhiteToSecondary} font-bold lg:text-xl`}>
              Get Started
            </span>{" "}
            <Image
              src="/lp-icons/leftarrow.svg"
              alt={`left arrow`}
              width={15}
              height={9}
            />{" "}
          </Link>
          <Link
            href={`/login`}
            className="from-lp-primary to-lp-secondaryTwo relative rounded-lg bg-gradient-to-r p-[2px] lg:text-lg"
          >
            <div className="mask mask-border mask-size-[calc(100%-4px)] rounded-md bg-white px-6 py-2 sm:py-3 md:px-8 lg:px-12 lg:py-4">
              <span className={`${PrimaryToSecondary2}`}>Log in</span>
            </div>
          </Link>
        </div>
        <div
          className={`relative mb-16 flex h-[35rem] justify-center overflow-hidden rounded-xl`}
        >
          <Image
            src={`/background/manpackage.jpeg`}
            alt={`grid`}
            width={2143}
            height={1646}
            className={`h-full w-full rounded-xl object-cover`}
          />
          {/*<div*/}
          {/*  // todo! add function to scroll down*/}
          {/*  className={`absolute bottom-8 cursor-pointer p-4 lg:p-6 hover:scale-110 transition duration-200 rounded-full border border-white flex items-center justify-center`}>*/}
          {/*  <Image*/}
          {/*    src={`/lp-icons/downarrow.svg`}*/}
          {/*    alt={`grid`}*/}
          {/*    width={2143}*/}
          {/*    height={1646}*/}
          {/*    className={`h-full w-full object-cover rounded-xl`}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
}
