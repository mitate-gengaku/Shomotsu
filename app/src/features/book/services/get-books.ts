"use server";

import { db } from "@/lib/db/setup/drizzle";

export const getBooks = async () => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const books = await db.query.booksTable.findMany({
    where: (booksTable, { eq }) => eq(booksTable.user_id, userId),
  });

  return books;
};
