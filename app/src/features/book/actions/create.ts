"use server"; // action.ts

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { contentSchema } from "@/features/book/schema/content";

export async function create(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: contentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // データの作成
  redirect("/book/238A26BF-C676-4FFA-BF17-73D673D35B6B");
}
