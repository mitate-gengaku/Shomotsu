import { and, eq, or } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { booksTable } from "@/lib/db/schema";
import { BookType } from "@/lib/db/type";
import { Book } from "@/types/book";

export class BookRepository {
  async create(values: BookType): Promise<Book[]> {
    return await db.insert(booksTable).values(values).returning();
  }

  async getBook(userId: string, slug: string, offset?: number) {
    return await db.query.booksTable.findFirst({
      where: (booksTable, { eq }) => {
        return offset
          ? eq(booksTable.publish, true)
          : and(
              eq(booksTable.slug, slug),
              or(eq(booksTable.publish, true), eq(booksTable.userId, userId)),
            );
      },
      offset: offset,
      with: {
        user: true,
        category: true,
      },
    });
  }

  async getMyBooks(userId: string): Promise<Book[]> {
    return await db.query.booksTable.findMany({
      where: (booksTable, { eq }) => eq(booksTable.userId, userId),
      orderBy: (fields, { desc }) => [desc(fields.id)],
    });
  }

  async getBooks(offset: number, pageSize: number = 16) {
    return await db.query.booksTable.findMany({
      where: (fields, { eq }) => eq(fields.publish, true),
      offset: offset,
      limit: pageSize,
      orderBy: (fields, { desc }) => [desc(fields.id)],
      with: {
        category: true,
      },
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
