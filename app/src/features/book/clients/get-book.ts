"use server";

import { auth } from "@clerk/nextjs/server";
import { and, or } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/lib/db/setup/drizzle";

export const getBook = async (slug: string) => {
  const { sessionId } = await auth();
  const decodedSlug = decodeURI(slug);
  const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";

  const book = await db.query.booksTable.findFirst({
    where: (booksTable, { eq }) => {
      return and(
        eq(booksTable.slug, decodedSlug),
        or(eq(booksTable.publish, true), eq(booksTable.user_id, userId)),
      );
    },
    with: {
      user: true,
      category: true,
    },
  });

  if (!book && sessionId) {
    redirect("/home");
  }

  if (!book) {
    redirect("/not-found");
  }

  return book;
};
