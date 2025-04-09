"use server";

import { db } from "@/lib/db/setup/drizzle";

export const getExploreBooks = async (
  page: number = 1,
  pageSize: number = 16,
) => {
  // const { userId } = await auth();
  // const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const offset = (page - 1) * pageSize;

  const books = await db.query.booksTable.findMany({
    where: (fields, { eq }) => eq(fields.publish, true),
    limit: pageSize,
    offset: offset,
    orderBy: (fields, { desc }) => [desc(fields.id)],
    with: {
      category: true,
    },
  });

  const isNextPageExists = await db.query.booksTable.findFirst({
    where: (fields, { eq }) => eq(fields.publish, true),
    offset: offset + pageSize,
  });

  return {
    books,
    nextPage: isNextPageExists ? page + 1 : undefined,
    prevPage: page === 1 ? undefined : page - 1,
  };
};
