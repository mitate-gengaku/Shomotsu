import { auth } from "@clerk/nextjs/server";
import React from "react";

import { BookInfoPageClient } from "@/features/book/clients/book-info-page-client";
import { bookService } from "@/services";

interface Props {
  slug: string;
}

export const BookInfoPage = async ({ slug }: Props) => {
  const { userId } = await auth();
  const book = await bookService.getBook(userId, slug);
  const requestUrl = process.env.SHOMOTSU_URL || "http://localhost:3000";

  return <BookInfoPageClient book={book} bookMarked={false} url={requestUrl} />;
};
