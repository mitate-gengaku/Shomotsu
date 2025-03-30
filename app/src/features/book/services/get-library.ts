"use server";

import { redirect } from "next/navigation";

import { db } from "@/lib/db/setup/drizzle";
import { LibraryWithOutUser } from "@/types/library";

export const getLibraryBooks = async (
  page: number = 1,
  pageSize: number = 16,
) => {
  // const { userId } = await auth();
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const offset = (page - 1) * pageSize;

  const libraries: LibraryWithOutUser[] =
    await db.query.librariesTable.findMany({
      where: (librariesTable, { eq }) => eq(librariesTable.userId, userId),
      limit: pageSize,
      offset: offset,
      with: {
        book: {
          with: {
            user: true,
          },
        },
      },
    });

  const books = libraries.map((library) => library.book);

  const isNextPageExists = await db.query.booksTable.findFirst({
    where: (booksTable, { eq }) => eq(booksTable.userId, userId),
    offset: offset + pageSize,
  });

  if (!books.length) {
    redirect("/not-found");
  }

  return {
    books,
    nextPage: isNextPageExists ? page + 1 : undefined,
    prevPage: page === 1 ? undefined : page - 1,
  };
};
