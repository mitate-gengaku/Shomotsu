import { useUser } from "@clerk/nextjs";
import { useSetAtom } from "jotai";
import { UserIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { ZodError } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarSchema } from "@/features/user/schema/avatar-schema";
import { cropperFileAtom } from "@/stores/cropper-file";
import { cn } from "@/utils/cn";

export const AvatarUploadForm = () => {
  const { user } = useUser();
  const [errors, setErrors] = useState<string | string[]>([]);
  const setCropperFile = useSetAtom(cropperFileAtom);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !files.length || !user) return;

    const file = files[0];

    try {
      const parsed = avatarSchema.parse({ avatar: file });
      setCropperFile(parsed.avatar);

      setErrors("");
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.errors[0].message);
      }
    }
  };

  return (
    <div className="group w-fit space-y-1">
      <label
        htmlFor="avatar"
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
          type="file"
          id="avatar"
          name="avatar"
          className="sr-only"
          accept=".jpg,.png"
          onChange={onChangeFile}
        />
        <span className="group-hover:text-gray-900 transition-all">
          アップロード
        </span>
      </label>
      {errors && <p className="text-xs text-red-500">{errors}</p>}
    </div>
  );
};
