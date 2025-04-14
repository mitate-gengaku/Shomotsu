import { auth } from "@clerk/nextjs/server";

import { BooksPageClient } from "@/features/book/clients/books-page-client";
import { redis } from "@/lib/redis";
import { bookService } from "@/services";

interface Props {
  page: number;
}

export const LibraryPage = async ({ page }: Props) => {
  const { userId } = await auth();
  const key = `user:${userId}:bookmarks`;
  const bookIds = await redis.smembers(key);

  const { books, nextPage, prevPage } = await bookService.getMyLibrary(page, bookIds);

  return <BooksPageClient books={books} nextPage={nextPage} prevPage={prevPage} title="ブックマークした本一覧" />;
};
