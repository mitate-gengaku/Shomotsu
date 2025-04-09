"use server";

import { db } from "@/lib/db/drizzle";

export const getBooks = async (page: number = 1, pageSize: number = 16) => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const offset = (page - 1) * pageSize;

  const books = await db.query.booksTable.findMany({
    where: (booksTable, { eq }) => eq(booksTable.userId, userId),
    limit: pageSize,
    offset: offset,
    orderBy: (fields, { desc }) => [desc(fields.id)],
  });

  const isNextPageExists = await db.query.booksTable.findFirst({
    where: (booksTable, { eq }) => eq(booksTable.userId, userId),
    offset: offset + pageSize,
  });

  if (!books.length) {
    return {
      books: [],
    };
  }

  return {
    books,
    nextPage: isNextPageExists ? page + 1 : undefined,
    prevPage: page === 1 ? undefined : page - 1,
  };
};
