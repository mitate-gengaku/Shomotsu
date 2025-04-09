"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import { avatarSchema } from "@/features/user/schema/avatar-schema";

export async function upload(formData: FormData) {
  const { userId } = await auth();

  if (!userId) redirect("/signin");

  const file = formData.get("avatar");

  try {
    const parsedFile = avatarSchema.parse({ avatar: file });
    const params = { file: parsedFile.avatar };

    const client = await clerkClient();

    await client.users.updateUserProfileImage(userId, params);

    return {
      status: "success",
      message: "アバター画像を更新しました",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: e.errors[0].message,
      };
    }
    return {
      status: "error",
      message: "エラーが発生しました",
    };
  }
}
