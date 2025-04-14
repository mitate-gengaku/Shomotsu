"use server";

import { and } from "drizzle-orm";
import { forbidden } from "next/navigation";

import { db } from "@/lib/db/drizzle";
import { BookWithAllRelations } from "@/types/book";

export const getUpdateBook = async (slug: string) => {
  const decodedSlug = decodeURI(slug);
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const book = (await db.query.booksTable.findFirst({
    where: (booksTable, { eq }) => {
      return and(eq(booksTable.slug, decodedSlug), eq(booksTable.userId, userId));
    },
    with: {
      user: true,
      category: true,
    },
  })) as BookWithAllRelations | undefined;

  if (!book) {
    forbidden();
  }

  return {
    book,
  };
};
