import { auth } from "@clerk/nextjs/server";
import { forbidden } from "next/navigation";
import React from "react";

import { UpdateBookPageClient } from "@/features/book/clients/update-book-client";
import { bookService, categoryService } from "@/services";

interface Props {
  slug: string;
}

export const UpdateBookPage = async ({ slug }: Props) => {
  const { userId } = await auth();
  const book = await bookService.getBookDetail(userId, slug);
  const categories = await categoryService.getCategories();

  if (book.userId !== userId) {
    forbidden();
  }

  return <UpdateBookPageClient book={book} categories={categories} />;
};
