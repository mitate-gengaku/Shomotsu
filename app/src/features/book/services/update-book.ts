"use server";

import { and, eq } from "drizzle-orm";

import { booksTable } from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";
import { BookType } from "@/lib/db/types/type";

export const updateBook = async (bookId: string, obj: Partial<BookType>) => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  try {
    await db
      .update(booksTable)
      .set({ ...obj })
      .where(and(eq(booksTable.userId, userId), eq(booksTable.id, bookId)));

    return;
  } catch (e) {
    throw e;
  }
};
