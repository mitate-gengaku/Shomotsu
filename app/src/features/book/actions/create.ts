"use server"; // action.ts

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { DatabaseError } from "pg";
import { ulid } from "ulid";

import { titleSchema } from "@/features/book/schema/title";
import { db } from "@/lib/db//drizzle";
import { booksTable } from "@/lib/db/schema";

export async function create(prevState: unknown, formData: FormData) {
  const userId: string = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const submission = parseWithZod(formData, {
    schema: titleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  let redirectTo = "";

  const values = submission.value;

  try {
    const book = await db
      .insert(booksTable)
      .values({
        ...values,
        id: ulid(),
        userId: userId,
      })
      .returning();

    redirectTo = `/book/${book[0].slug}`;
  } catch (e) {
    if (e instanceof DatabaseError) {
      return submission.reply({
        formErrors: [e.detail ?? ""],
      });
    }
    return submission.reply();
  }

  if (redirectTo !== "") {
    redirect(redirectTo);
  }
}
