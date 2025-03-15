import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoltIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/sidebar";

export const AuthHeader = () => {
  return (
    <header
      className="w-full fixed top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
      data-testid="header"
    >
      <div className="w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-start gap-3">
        <Sidebar />
        <h1 className="text-sm font-manrope font-semibold">
          <Link href={"/home"}>Shomotsu</Link>
        </h1>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer" data-testid="avatar">
                <AvatarImage src={"https://placehold.co/100x150"} />
                <AvatarFallback>
                  <UserIcon className="size-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[13rem] p-0" align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={"/account"}
                  className="w-full px-3 py-3 flex items-center gap-2"
                >
                  <UserIcon className="size-4" />
                  アカウント
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/"}
                  className="w-full px-3 py-3 flex items-center gap-2"
                >
                  <BoltIcon className="size-4" />
                  設定
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button className="w-full px-3 py-3 flex items-center gap-2">
                  <LogOutIcon className="size-4" />
                  ログアウト
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}