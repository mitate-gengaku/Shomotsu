"use client"

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { BrushIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SettingSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-fit flex-col gap-4 md:h-full md:w-52 lg:w-64">
      <h2 className="text-3xl font-semibold">設定</h2>
      <nav>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-start">
            <Link
              href={"/setting/account"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start text-muted-foreground hover:text-foreground",
                pathname === "/setting/account" && "font-semibold text-primary",
              )}
            >
              <UserIcon />
              アカウント
            </Link>
          </li>
          <li className="flex items-center justify-start">
            <Link
              href={"/setting/account"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start text-muted-foreground hover:text-foreground",
                pathname === "/setting/appearance" && "font-bold text-primary",
              )}
            >
              <BrushIcon />
              テーマ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}