import { TStep } from "@/app/utils/types";

export default function Step({ index, title, description }: TStep) {
  return (
    <div className={`flex cursor-pointer items-start gap-10 px-6 py-10 rounded-lg border border-lp-light-border hover:border-lp-primary text-lp-primary group hover:text-lp-secondary font-bold text-2xl hover:bg-lp-primary transition duration-500`}>
      <p>0{index}.</p>
      <p className={`flex flex-col relative`}>
        {title}
        <span className={`text-white text-xl font-light transition duration-50 h-0 translate-y-3 group-hover:translate-y-0`}>{description}</span>
        <span className={`max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 text-transparent`}> text </span>
      </p>
    </div>
  );
}
