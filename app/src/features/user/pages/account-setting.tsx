"use client";

import { useUser } from "@clerk/nextjs";

import { SettingSidebar } from "@/components/apperance/setting-sidebar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountSettingForm } from "@/features/user/components/account-setting-form";
import { AvatarUploadForm } from "@/features/user/components/avatar-upload-form";
import { CropperDialog } from "@/features/user/components/cropper-dialog";
import { cn } from "@/utils/cn";

export const AccountSettingPage = () => {
  const { user } = useUser();

  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col md:flex-row gap-8 lg:mb-0">
      <SettingSidebar />
      <div className="w-full space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">アカウント</h2>
        <div className="space-y-8">
          <AvatarUploadForm />
          <Separator />
          {user ? (
            <AccountSettingForm username={user.username ?? ""} />
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="w-16 h-3" />
                <Skeleton className={cn("h-9")} />
              </div>
              <Skeleton className="w-32 h-9" />
            </div>
          )}
        </div>
      </div>
      <CropperDialog />
    </div>
  );
};
