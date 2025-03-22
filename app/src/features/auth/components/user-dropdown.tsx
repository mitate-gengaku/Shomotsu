"use client";

import { useUser } from "@clerk/nextjs";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/features/auth/components/signout-button";
import Link from "next/link";

export const UserDropdown = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none rounded-full data-[state=open]:ring-teal-500 data-[state=open]:ring-2">
        <Avatar className="size-8">
          <AvatarImage
            src={user?.imageUrl}
            alt={user?.fullName ?? "プロフィール画像"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl p-0 min-w-[15rem]">
        <DropdownMenuItem asChild>
          <Link
            className="w-full h-12 px-4 flex items-center gap-4 cursor-pointer"
            href={"/setting/account"}
          >
            <UserIcon />
            アカウント
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="w-full h-12 px-4 flex items-center gap-4 cursor-pointer"
            href={"/setting"}
          >
            <SettingsIcon />
            設定
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
