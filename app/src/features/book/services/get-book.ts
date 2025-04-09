"use server";

import { and, or } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/lib/db/drizzle";

export const getBook = async (slug: string) => {
  const decodedSlug = decodeURI(slug);
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const book = await db.query.booksTable.findFirst({
    where: (booksTable, { eq }) => {
      return and(
        eq(booksTable.slug, decodedSlug),
        or(eq(booksTable.publish, true), eq(booksTable.userId, userId)),
      );
    },
    with: {
      user: true,
      category: true,
    },
  });

  if (!book) {
    redirect("/not-found");
  }

  const isExistLibrary = await db.query.librariesTable.findFirst({
    where: (librariesTable, { eq }) => eq(librariesTable.bookId, book.id),
  });

  return {
    book,
    bookMarked: isExistLibrary ? true : false,
  };
};
