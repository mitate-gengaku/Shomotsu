import { auth } from "@clerk/nextjs/server";
import React from "react";

import { BookInfoPageClient } from "@/features/book/clients/book-info-page-client";
import { checkBookMarked } from "@/features/book/utils/check-bookmarked";
import { bookService } from "@/services";

interface Props {
  slug: string;
}

export const BookInfoPage = async ({ slug }: Props) => {
  const { userId } = await auth();
  const book = await bookService.getBookDetail(userId, slug);
  const requestUrl = process.env.SHOMOTSU_URL || "http://localhost:3000";

  const bookMarked = await checkBookMarked(userId, book.id);

  return <BookInfoPageClient book={book} bookMarked={bookMarked ? true : false} url={requestUrl} />;
};
