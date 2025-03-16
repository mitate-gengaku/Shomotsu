import React from "react";

import { BookDetailClient } from "@/features/book/client/book-detail";
import { getBook } from "@/features/book/services/get-book";

export const BookDetail = async () => {
  const book = await getBook("238A26BF-C676-4FFA-BF17-73D673D35B6B");

  return <BookDetailClient book={book} />;
};
