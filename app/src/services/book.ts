import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DatabaseError } from "pg";

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

  async getMyBooks(userId: string | null): Promise<Book[]> {
    return this.bookRepository.getBooks(userId ?? "");
  }

  async getBook(
    userId: string | null,
    slug: string,
  ): Promise<BookWithAllRelations> {
    const decodedSlug = decodeURI(slug);

    const book = await this.bookRepository.getBook(userId ?? "", decodedSlug);

    if (!book) {
      redirect("/not-found");
    }

    return book;
  }

  async update(
    userId: string | null,
    bookId: string | null,
    values: Partial<BookType>,
  ) {
    try {
      const book = await this.bookRepository.update(
        userId ?? "",
        bookId ?? "",
        values,
      );

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
