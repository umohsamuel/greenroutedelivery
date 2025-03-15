import Image from "next/image";
import { PrimaryToSecondary2, WhiteToSecondary } from "../utils/customStyles";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={`w-full relative flex justify-center`}>
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
            <div className={`${PrimaryToSecondary2} lg:text-7xl md:text-5xl text-2xl font-bold`}>
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
            <p className={`flex flex-col text-xs md:text-sm lg:text-lg text-[#252525]`}>
            <span>
              Send and track your packages effortlessly. Request a delivery,
            </span>
              <span>and we’ll handle the rest!</span>
            </p>
          </article>
        </div>
        <div className={`mb-16 flex items-center justify-center gap-4`}>
          <Link href={`/signup`} className={`bg-lp-primary flex gap-2.5 rounded-lg lg:px-12 md:px-8 px-6 lg:py-4 sm:py-3 py-2`}>
            📦{" "}
            <span className={`${WhiteToSecondary} lg:text-xl font-bold`}>
            Get Started
          </span>{" "}
            <Image
              src="/lp-icons/leftarrow.svg"
              alt={`left arrow`}
              width={15}
              height={9}
            />{" "}
          </Link>
          <Link href={`/login`} className="relative lg:text-lg p-[2px] rounded-lg bg-gradient-to-r from-lp-primary  to-lp-secondaryTwo">
            <div className="bg-white lg:px-12 md:px-8 px-6 lg:py-4 sm:py-3 py-2 rounded-md mask mask-border mask-size-[calc(100%-4px)]"><span className={`${PrimaryToSecondary2}`}>Log in</span></div>
          </Link>
        </div>
        <div className={`h-[35rem] mb-16 rounded-xl overflow-hidden flex justify-center relative`}>
          <Image
            src={`/background/manpackage.jpeg`}
            alt={`grid`}
            width={2143}
            height={1646}
            className={`h-full w-full object-cover rounded-xl`}
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
