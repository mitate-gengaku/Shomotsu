"use server";

import { parseWithZod } from "@conform-to/zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DatabaseError } from "pg";

import { updateContentSchema } from "@/features/book/schema/update-content";
import { booksTable } from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";

const generateToc = (content: string) => {
  const arrayOfParsedContent = content.split("\n");
  const toc: string[] = [];

  for (let i = 0; i < arrayOfParsedContent.length; i++) {
    const parsedItem = arrayOfParsedContent[i];

    if (parsedItem.startsWith("## ")) {
      toc.push(parsedItem.replace("## ", ""));
    }
  }

  return toc;
};

export async function update(prevState: unknown, formData: FormData) {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  if (!userId) redirect("/signin");

  const submission = parseWithZod(formData, {
    schema: updateContentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { slug, category, bookId, description, content, publish } =
    submission.value;
  let redirectTo = "";

  const toc = generateToc(content ?? "");

  try {
    await db
      .update(booksTable)
      .set({
        categoryId: category,
        description: description ? description : "",
        content: content ? content : "",
        toc,
        publish,
      })
      .where(and(eq(booksTable.userId, userId), eq(booksTable.id, bookId)));

    redirectTo = `/book/${slug}`;
  } catch (e) {
    if (e instanceof DatabaseError) {
      return submission.reply({
        formErrors: [e.detail ?? ""],
      });
    }
    return submission.reply();
  }

  if (redirectTo !== "") {
    revalidatePath(redirectTo);
    redirect(redirectTo);
  }
}
