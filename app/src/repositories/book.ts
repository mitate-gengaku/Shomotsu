import { and, eq, or } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { booksTable } from "@/lib/db/schema";
import { BookType } from "@/lib/db/type";
import { Book } from "@/types/book";

export class BookRepository {
  async create(values: BookType): Promise<Book[]> {
    return await db.insert(booksTable).values(values).returning();
  }

  async getBook(userId: string, slug: string) {
    return await db.query.booksTable.findFirst({
      where: (booksTable, { eq }) => {
        return and(
          eq(booksTable.slug, slug),
          or(eq(booksTable.publish, true), eq(booksTable.userId, userId)),
        );
      },
      with: {
        user: true,
        category: true,
      },
    });
  }

  async getBooks(userId: string): Promise<Book[]> {
    return await db.query.booksTable.findMany({
      where: (booksTable, { eq }) => eq(booksTable.userId, userId),
      orderBy: (fields, { desc }) => [desc(fields.id)],
    });
  }

  async update(userId: string, bookId: string, values: Partial<BookType>) {
    return await db
      .update(booksTable)
      .set(values)
      .where(and(eq(booksTable.userId, userId), eq(booksTable.id, bookId)))
      .returning();
  }

  async delete(userId: string, bookId: string) {
    return await db
      .delete(booksTable)
      .where(and(eq(booksTable.userId, userId), eq(booksTable.id, bookId)));
  }
}
