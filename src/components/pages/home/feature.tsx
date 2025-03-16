import { TFeature } from "@/types/home";
import Image from "next/image";

export default function Feature({ icon, title, description }: TFeature) {
  return (
    <div
      className={`border-lp-light-border space-y-10 rounded-xl border px-5 py-20`}
    >
      <div className={`h-16 w-16`}>
        <Image
          src={icon}
          alt={`grid`}
          width={60}
          height={60}
          className={`h-full w-full object-cover`}
        />
      </div>
      <div>
        <h3 className={`text-2xl font-medium text-[#0F0049]`}>{title}</h3>
        <p className={`text-lp-light-text text-xl font-light`}>{description}</p>
      </div>
    </div>
  );
}
