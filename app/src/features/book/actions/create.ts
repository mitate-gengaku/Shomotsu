"use server"; // action.ts

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { contentSchema } from "@/features/book/schema/content";
import { db } from "@/lib/db/setup/drizzle";
import { booksTable, categoriesTable } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { categories } from "@/config/categories";
import { BookType } from "@/lib/db/types/type";
import { ulid } from "ulid";
import { revalidatePath } from "next/cache";
import { DatabaseError } from "pg";
import { titleSchema } from "@/features/book/schema/title";

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
      .returning()
  

  
    redirectTo = `/book/${book[0].slug}`;

  } catch (e) {
    if (e instanceof DatabaseError) {
      return submission.reply({
        formErrors: [e.detail ?? ""]
      })
    }
    return submission.reply()
  }

  if (redirectTo !== "") {
    redirect(redirectTo)
  }
}
