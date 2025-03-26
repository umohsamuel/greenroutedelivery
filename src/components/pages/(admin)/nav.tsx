"use client";

import { PrimaryToSecondary2 } from "@/lib";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export function AdminNav({ userName }: Readonly<{ userName: string }>) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex w-full items-center justify-between border-b bg-white px-10 py-6 lg:px-20`}
    >
      <Link href={`/`}>
        <span
          className={`${PrimaryToSecondary2} text-lg font-medium lg:text-2xl`}
        >
          greenroutedelivery
        </span>
      </Link>

      <div className="hidden items-center gap-8 lg:flex">
        <Link href={`/manage`}>
          <span
            className={`${pathname.startsWith("/manage") ? PrimaryToSecondary2 : "text-[#68706F]"} text-base font-medium`}
          >
            All Shipments
          </span>
        </Link>

        <Link href={`/users`}>
          <span
            className={`${pathname.startsWith("/users") ? PrimaryToSecondary2 : "text-[#68706F]"} text-base font-medium`}
          >
            Users
          </span>
        </Link>
      </div>

      {userName && (
        <div className="hidden items-center gap-4 lg:flex">
          <div className="aspect-square h-10 w-10 rounded-full bg-gradient-to-r from-[#003F38] to-[#65B40E] p-px">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <span className="text-base font-bold text-[#003F38]">
                {userName[0]}
              </span>
            </div>
          </div>
          <span className="text-base font-medium text-[#333333]">
            {userName}
          </span>

          <Link
            href="/"
            className="ml-4 flex aspect-square h-10 w-10 items-center justify-center rounded-full border border-solid border-red-500 bg-red-500/50"
          >
            <LogOut size={16} color="red" />
          </Link>
        </div>
      )}

      <MobileDrawer pathname={pathname} userName={userName} />
    </nav>
  );
}

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileDrawerProps {
  pathname: string;
  userName: string;
}

const MobileDrawer: FC<MobileDrawerProps> = ({ pathname, userName }) => {
  return (
    <Sheet>
      <SheetTitle className="sr-only">.</SheetTitle>
      <SheetTrigger asChild>
        <Button className="flex aspect-square h-8 w-8 items-center justify-center bg-transparent !p-0 lg:hidden">
          <Menu size="100%" color="black" className="[&_svg]:size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-l border-white bg-white px-[5%] py-[10%] text-white backdrop-blur-sm">
        <div className="flex flex-col gap-8 text-black">
          <SheetClose asChild>
            <Link href={`/manage`}>
              <span
                className={`${pathname.startsWith("/manage") ? "text-gray-500" : "text-black"} text-base font-medium`}
              >
                All Shipments
              </span>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href={`/users`}>
              <span
                className={`${pathname.startsWith("/users") ? "text-gray-500" : "text-black"} text-base font-medium`}
              >
                Users
              </span>
            </Link>
          </SheetClose>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="aspect-square h-10 w-10 rounded-full bg-gradient-to-r from-[#003F38] to-[#65B40E] p-px">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <span className="text-base font-bold text-[#003F38]">
                  {userName[0]}
                </span>
              </div>
            </div>
            <span className="text-base font-medium text-black">{userName}</span>
          </div>

          <SheetClose asChild>
            <Link
              href="/"
              onClick={() => {
                Cookies.remove("token");
              }}
              className="flex h-12 w-full items-center justify-center rounded-[8px] border border-solid border-red-500 bg-red-500/50"
            >
              Logout
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
