import React from "react";

import { BookDetailClient } from "@/features/book/client/book-detail-client";
import { getBook } from "@/features/book/services/get-book";
import { IBook } from "@/types/book";

export const BookDetail = async ({ bookId }: { bookId: string }) => {
  const book: IBook = await getBook(bookId);

  return <BookDetailClient book={book} />;
};
