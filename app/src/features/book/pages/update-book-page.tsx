import React from "react";

import { UpdateBookPageClient } from "@/features/book/clients/update-book-client";
import { getAllCategories } from "@/features/book/services/get-all-categories";
import { getUpdateBook } from "@/features/book/services/get-update-book";

interface Props {
  slug: string;
}

export const UpdateBookPage = async ({ slug }: Props) => {
  const { book } = await getUpdateBook(slug);
  const { categories } = await getAllCategories();

  return <UpdateBookPageClient book={book} categories={categories} />;
};
