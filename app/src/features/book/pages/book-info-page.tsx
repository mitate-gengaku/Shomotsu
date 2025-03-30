import React from "react";

import { BookInfoPageClient } from "@/features/book/clients/book-info-page-client";
import { getBook } from "@/features/book/services/get-book";

interface Props {
  slug: string;
}

export const BookInfoPage = async ({ slug }: Props) => {
  const book = await getBook(slug);
  const requestUrl = process.env.SHOMOTSU_URL || "http://localhost:3000";

  return <BookInfoPageClient book={book} url={requestUrl} />;
};
