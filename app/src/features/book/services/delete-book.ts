"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db/drizzle";
import { booksTable } from "@/lib/db/schema";

export const deleteBook = async (id: string) => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  try {
    await db
      .delete(booksTable)
      .where(and(eq(booksTable.id, id), eq(booksTable.userId, userId)));
    revalidatePath("/home");

    return "本を削除しました";
  } catch (e) {
    throw e;
  }
};
