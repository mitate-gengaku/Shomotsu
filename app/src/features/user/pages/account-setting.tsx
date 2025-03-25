"use client";

import { useUser } from "@clerk/nextjs";

import { SettingSidebar } from "@/components/apperance/setting-sidebar";
import { Spinner } from "@/components/loading/spinner";
import { Separator } from "@/components/ui/separator";
import { AccountSettingForm } from "@/features/user/components/account-setting-form";
import { AvatarUploadForm } from "@/features/user/components/avatar-upload-form";
import { CropperDialog } from "@/features/user/components/cropper-dialog";

export const AccountSettingPage = () => {
  const { user } = useUser();

  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col md:flex-row gap-8 lg:mb-0">
      <SettingSidebar />
      <div className="w-full space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          アカウント
        </h2>
        <div className="space-y-8">
          <AvatarUploadForm />
          <Separator />
          {user ? (
            <AccountSettingForm username={user.username ?? ""} />
          ) : (
            <Spinner className="text-teal-500 size-8" />
          )}
        </div>
      </div>
      <CropperDialog />
    </div>
  );
};
