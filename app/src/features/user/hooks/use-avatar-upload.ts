import { useUser } from "@clerk/nextjs";
import { useSetAtom } from "jotai";
import { ChangeEvent, useState } from "react";
import { ZodError } from "zod";

import { avatarSchema } from "@/features/user/schema/avatar-schema";
import { cropperFileAtom } from "@/stores/cropper-file";

export const useAvatarUpload = () => {
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

  return {
    user,
    onChangeFile,
    errors,
  };
};
