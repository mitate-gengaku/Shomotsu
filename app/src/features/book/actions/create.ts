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

export async function create(prevState: unknown, formData: FormData) {
  const userId: string = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const submission = parseWithZod(formData, {
    schema: contentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { category: categoryValue, ...args } = submission.value;

  const targetCategory = await db.query.categoriesTable.findFirst({
    columns: {
      id: true
    },
    where: ({ category }) => eq(category, categoryValue as string)
  })

  if (!targetCategory) {
    return submission.reply({
      formErrors: ["エラーです"]
    })
  }

  try {
    const values: BookType = {
      ...args,
      id: ulid(),
      userId: userId,
      categoryId: targetCategory.id,
      toc: [] as string[]
    }
  
    // データの作成
    const book = await db
      .insert(booksTable)
      .values(values)
      .returning()
  
  
    revalidatePath("/")
  
    redirect(`/book/${book[0].slug}`);
  } catch (e) {
    if (e instanceof DatabaseError) {
      console.log(e)
      return submission.reply({
        formErrors: [e.detail ?? ""]
      })
    }
    return submission.reply()
  }
}
