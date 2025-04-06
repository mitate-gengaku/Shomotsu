"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { contentSchema } from "@/features/book/schema/content";
import { updateBook } from "@/features/book/services/update-book";

export async function updateBookAction(prevState: unknown, formData: FormData) {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  if (!userId) redirect("/signin");

  const submission = parseWithZod(formData, {
    schema: contentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const params = { publish: submission.value.publish };


  redirect(`/book/${submission.value.slug}`);
}
