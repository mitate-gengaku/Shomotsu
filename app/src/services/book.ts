import { and, desc, eq, inArray, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DatabaseError } from "pg";

import { booksTable } from "@/lib/db/schema";
import { BookType } from "@/lib/db/type";
import { BookRepository } from "@/repositories/book";
import { Book, BookWithAllRelations } from "@/types/book";

export class BookService {
  constructor(private bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async create(values: BookType) {
    return this.bookRepository.create(values);
  }

  async getBookDetail(userId: string | null, slug: string): Promise<BookWithAllRelations> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const decodedSlug = decodeURI(slug);

    const where = and(
      eq(booksTable.slug, decodedSlug),
      or(eq(booksTable.publish, true), eq(booksTable.userId, userId ?? "")),
    );

    const book = await this.bookRepository.findBook(where);

    if (!book) {
      redirect("/not-found");
    }

    return book;
  }

  async getMyBooks(userId: string | null): Promise<Book[]> {
    const where = eq(booksTable.userId, userId ?? "");
    const orderBy = desc(booksTable.createdAt);

    return this.bookRepository.findBooks(where, orderBy);
  }

  async getBooksSortByCreatedAt(page: number) {
    const where = eq(booksTable.publish, true);
    const orderBy = desc(booksTable.createdAt);
    const pageSize = 16;
    const offset = (page - 1) * pageSize;

    const books = await this.bookRepository.findBooks(where, orderBy, offset, pageSize);
    const nextBook = await this.bookRepository.findBook(where, orderBy, offset + pageSize);

    return {
      books,
      nextPage: nextBook ? page + 1 : undefined,
      prevPage: page === 1 ? undefined : page - 1,
    };
  }

  async getBooksWithCategoryIdSortByCreatedAt(page: number, userId: string | null, categoryId?: string) {
    const where = or(
      eq(booksTable.userId, userId ?? ""),
      and(eq(booksTable.publish, true), eq(booksTable.categoryId, categoryId ?? "")),
    );
    const orderBy = desc(booksTable.createdAt);
    const pageSize = 16;
    const offset = (page - 1) * pageSize;

    const books = await this.bookRepository.findBooks(where, orderBy, offset, pageSize);
    const nextBook = await this.bookRepository.findBook(where, orderBy, offset + pageSize);

    return {
      books,
      nextPage: nextBook ? page + 1 : undefined,
      prevPage: page === 1 ? undefined : page - 1,
    };
  }

  async getMyLibrary(page: number, bookIds: string[]) {
    const where = inArray(booksTable.id, bookIds);
    const orderBy = desc(booksTable.createdAt);
    const pageSize = 16;
    const offset = (page - 1) * pageSize;

    const books = await this.bookRepository.findBooks(where, orderBy, offset, pageSize);
    const nextBook = await this.bookRepository.findBook(where, orderBy, offset + pageSize);

    return {
      books,
      nextPage: nextBook ? page + 1 : undefined,
      prevPage: page === 1 ? undefined : page - 1,
    };
  }

  async update(userId: string | null, bookId: string | null, values: Partial<BookType>) {
    try {
      const book = await this.bookRepository.update(userId ?? "", bookId ?? "", values);

      const redirectTo = `/book/${book[0].slug}`;

      return {
        status: true,
        result: redirectTo,
      };
    } catch (e) {
      if (e instanceof DatabaseError) {
        return {
          status: false,
          result: e.detail ?? "",
        };
      }

      return {
        status: false,
        result: "Something went wrong",
      };
    }
  }

  async delete(userId: string | null, bookId: string | null) {
    try {
      await this.bookRepository.delete(userId ?? "", bookId ?? "");

      revalidatePath("/home");

      return "本を削除しました";
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
      return "エラーが発生しました";
    }
  }
}
