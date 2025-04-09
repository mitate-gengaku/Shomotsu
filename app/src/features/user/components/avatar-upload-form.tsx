import { useUser } from "@clerk/nextjs";
import { useSetAtom } from "jotai";
import { UserIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ZodError } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { avatarSchema } from "@/features/user/schema/avatar-schema";
import { cropperFileAtom } from "@/stores/cropper-file";
import { cn } from "@/utils/cn";
import { useAvatarUpload } from "@/features/user/hooks/use-avatarupload";

export const AvatarUploadForm = () => {
  const {
    user,
    onChangeFile,
    errors
  } = useAvatarUpload()

  return (
    <div className="group w-fit space-y-1">
      <label
        htmlFor="avatar"
        className={cn(
          "w-16 md:w-20 sizw-full cursor-pointer flex flex-col justify-center items-center text-sm gap-1 font-semibold text-muted-foreground",
        )}
      >
        {user ? (
          <>
            <Avatar className="size-16 md:size-20">
              <AvatarImage
                src={user?.imageUrl}
                alt="プロフィール画像"
                className="block"
              />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="sr-only"
              accept=".jpg,.png"
              onChange={onChangeFile}
              data-testid="avatar-file-input"
              disabled={!user}
            />
            <span className="group-hover:text-gray-900 transition-all">
              アップロード
            </span>
          </>
        ) : (
          <>
            <Skeleton className="size-16 md:size-20 rounded-full" />
            <Skeleton className="w-16 h-3" />
          </>
        )}
      </label>
      {errors && <p className="text-xs text-red-500">{errors}</p>}
    </div>
  );
};
