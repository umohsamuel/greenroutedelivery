import { TStep } from "@/types/home";

export default function Step({ index, title, description }: TStep) {
  return (
    <div
      className={`border-lp-light-border hover:border-lp-primary text-lp-primary group hover:text-lp-secondary hover:bg-lp-primary flex cursor-pointer items-start gap-10 rounded-lg border px-6 py-10 text-2xl font-bold transition duration-500`}
    >
      <p>0{index}.</p>
      <p className={`relative flex flex-col`}>
        {title}
        <span
          className={`h-0 translate-y-3 text-xl font-light text-white transition duration-50 group-hover:translate-y-0`}
        >
          {description}
        </span>
        <span
          className={`max-h-0 overflow-hidden text-transparent transition-all duration-500 group-hover:max-h-40`}
        >
          {" "}
          text{" "}
        </span>
      </p>
    </div>
  );
}
