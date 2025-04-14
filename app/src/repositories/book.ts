import { and, eq, SQL } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { booksTable } from "@/lib/db/schema";
import { BookType } from "@/lib/db/type";
import { Book, BookWithAllRelations } from "@/types/book";

export class BookRepository {
  async create(values: BookType): Promise<Book[]> {
    return await db.insert(booksTable).values(values).returning();
  }

  async findBook(
    where?: SQL | undefined,
    orderBy?: SQL | undefined,
    offset?: number,
  ): Promise<BookWithAllRelations | undefined> {
    return await db.query.booksTable.findFirst({
      where: where,
      offset: offset,
      orderBy: orderBy,
      with: {
        user: true,
        category: true,
      },
    });
  }

  async findBooks(where?: SQL | undefined, orderBy?: SQL | undefined, offset?: number, limit?: number) {
    return await db.query.booksTable.findMany({
      where: where,
      offset: offset,
      limit: limit,
      orderBy: orderBy,
      with: {
        category: true,
      },
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
    return await db.delete(booksTable).where(and(eq(booksTable.userId, userId), eq(booksTable.id, bookId)));
  }
}
