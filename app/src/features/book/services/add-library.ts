"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { librariesTable } from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";

export const addLibrary = async (
  bookId: string,
  bookMarked: boolean,
  slug: string,
) => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  try {
    if (bookMarked) {
      await db
        .delete(librariesTable)
        .where(
          and(
            eq(librariesTable.userId, userId),
            eq(librariesTable.bookId, bookId),
          ),
        );
    } else {
      await db.insert(librariesTable).values({
        userId: userId,
        bookId: bookId,
      });
    }

    revalidatePath(`/book/${slug}`);

    return;
  } catch (e) {
    throw e;
  }
};
