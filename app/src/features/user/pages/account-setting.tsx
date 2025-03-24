"use client";

import { useUser } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import { ChangeEvent } from "react";

import { SettingSidebar } from "@/components/apperance/setting-sidebar";
import { Spinner } from "@/components/loading/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AccountSettingForm } from "@/features/user/components/account-setting-form";
import { cn } from "@/utils/cn";

export const AccountSettingPage = () => {
  const { user } = useUser();

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;
    const file = files[0];

    if (file) {
      await user?.setProfileImage({ file: file });
    }
  };

  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col md:flex-row gap-8 lg:mb-0">
      <SettingSidebar />
      <div className="w-full space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          アカウント
        </h2>
        <div className="space-y-8">
          <div className="group w-fit space-y-1">
            <label
              htmlFor="upload"
              className={cn(
                "w-16 md:w-20 sizw-full cursor-pointer flex flex-col justify-center items-center text-sm gap-1 font-semibold text-muted-foreground",
              )}
            >
              <Avatar className="size-16 md:size-20">
                <AvatarImage
                  src={user?.imageUrl}
                  alt="プロフィール画像"
                  className="block"
                />
                <AvatarFallback className="animate-pulse">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <input
                id="upload"
                type="file"
                className="sr-only"
                onChange={onChangeFile}
                multiple={false}
              />
              <span className="group-hover:text-gray-900 transition-all">
                アップロード
              </span>
            </label>
          </div>
          <Separator />
          {user ? (
            <AccountSettingForm username={user.username ?? ""} />
          ) : (
            <Spinner className="text-teal-500 size-8" />
          )}
        </div>
      </div>
    </div>
  );
};
