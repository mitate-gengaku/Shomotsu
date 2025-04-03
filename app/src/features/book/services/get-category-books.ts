"use server";

import { db } from "@/lib/db/setup/drizzle";

export const getCategoryBooks = async (
  page: number = 1,
  pageSize: number = 16,
  categoryName: string,
) => {
  // const { userId } = await auth();
  // const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const offset = (page - 1) * pageSize;

  const category = await db.query.categoriesTable.findFirst({
    where: (fields, { eq }) => eq(fields.category, categoryName),
  });

  const books = await db.query.booksTable.findMany({
    where: (fields, { eq, and }) => {
      return and(
        eq(fields.publish, true),
        eq(fields.categoryId, category?.id || ""),
      );
    },
    limit: pageSize,
    offset: offset,
    orderBy: (fields, { desc }) => [desc(fields.id)],
  });

  const isNextPageExists = await db.query.booksTable.findFirst({
    where: (fields, { eq }) => eq(fields.publish, true),
    offset: offset + pageSize,
  });

  return {
    books,
    nextPage: isNextPageExists ? page + 1 : undefined,
    prevPage: page === 1 ? undefined : page - 1,
    title: category?.label ?? "",
  };
};
