import Image from "next/image";
import { TFeature } from "@/app/utils/types";

export default function Feature({icon,title,description}: TFeature) {
  return (
  <div className={`py-20 px-5 space-y-10 border rounded-xl border-lp-light-border`}>
    <div className={`w-16 h-16`}>
      <Image
        src={icon}
        alt={`grid`}
        width={60}
        height={60}
        className={`object-cover w-full h-full`}
      />
    </div>
    <div>
      <h3 className={`text-[#0F0049] text-2xl font-medium`}>{title}</h3>
      <p className={`font-light text-xl text-lp-light-text`}>{description}</p>
    </div>
  </div>
  );
}