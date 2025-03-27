"use client";

import { BrushIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export const SettingSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-fit flex-col gap-4 md:h-full md:w-52 lg:w-64">
      <h2 className="text-xl font-semibold">設定</h2>
      <nav>
        <ul className="space-y-2">
          <li className="flex items-center justify-start">
            <Link
              href={"/setting/account"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start text-muted-foreground hover:text-foreground",
                pathname === "/setting" &&
                  "font-semibold text-primary bg-slate-300/20",
                pathname === "/setting/account" &&
                  "font-semibold text-primary bg-slate-300/20",
              )}
            >
              <UserIcon />
              アカウント
            </Link>
          </li>
          <li className="flex items-center justify-start">
            <Link
              href={"/setting/appearance"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start text-muted-foreground hover:text-foreground",
                pathname === "/setting/appearance" &&
                  "font-semibold text-primary bg-slate-300/20",
              )}
            >
              <BrushIcon />
              テーマ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
