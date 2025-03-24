"use server"; // action.ts

import { auth, clerkClient } from "@clerk/nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { userNameSchema } from "@/features/user/schema/username-schema";

export async function update(prevState: unknown, formData: FormData) {
  const { userId } = await auth();

  if (!userId) redirect("/signin");

  const submission = parseWithZod(formData, {
    schema: userNameSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const params = { username: submission.value.username };

  const client = await clerkClient();

  await client.users.updateUser(userId, params);

  return redirect("/setting/account");
}
