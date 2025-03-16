import React from "react";

import { BookDetailClient } from "@/features/book/client/book-detail";
import { getBook } from "@/features/book/services/get-book";

export const BookDetail = async ({ bookId }: { bookId: string }) => {
  const book = await getBook(bookId);

  return <BookDetailClient book={book} />;
};
