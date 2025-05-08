"use client";

import { useUser } from "@clerk/nextjs";
import { LibraryBigIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/features/auth/components/signout-button";

export const UserDropdown = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none rounded-full data-[state=open]:ring-teal-500 data-[state=open]:ring-2"
        data-testid="dropdown-trigger"
      >
        <Avatar className="size-8" data-testid="avatar">
          <AvatarImage src={user?.imageUrl} alt={"プロフィール画像"} />
          <AvatarFallback>
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl p-0 min-w-[15rem]" data-testid="dropdown-content">
        <DropdownMenuItem className="w-full h-10 px-4 flex items-center gap-4 cursor-pointer" asChild>
          <Link href={"/setting/account"}>
            <UserIcon />
            アカウント
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full h-10 px-4 flex items-center gap-4 cursor-pointer" asChild>
          <Link href={"/library"}>
            <LibraryBigIcon />
            ライブラリー
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full h-10 px-4 flex items-center gap-4 cursor-pointer" asChild>
          <Link href={"/setting"}>
            <SettingsIcon />
            設定
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full h-10 px-4 flex items-center gap-4 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-900"
          asChild
        >
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
