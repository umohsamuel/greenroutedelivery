import { AuthNav } from "@/components/pages/auth";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        background: "url('/background/grid-layer.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex min-h-screen flex-col"
    >
      <AuthNav />
      <div className="flex w-full flex-1 items-center justify-center px-6 py-10">
        <div className="w-full rounded-[8px] border border-solid border-[#DADADA] bg-white px-6 py-9 shadow-2xl lg:max-w-[565px] lg:px-11">
          {children}
        </div>
      </div>
    </div>
  );
}
