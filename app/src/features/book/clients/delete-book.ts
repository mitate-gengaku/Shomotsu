"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { booksTable } from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";

export const deleteBook = async (id: string) => {
  // const { userId } = await auth();

  try {
    await db.delete(booksTable).where(eq(booksTable.id, id));
    revalidatePath("/home");

    return "本を削除しました";
  } catch (e) {
    throw e;
  }
};
