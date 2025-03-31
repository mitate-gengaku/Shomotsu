import React from "react";

import { UpdateBookPageClient } from "@/features/book/clients/update-book-client";
import { getUpdateBook } from "@/features/book/services/get-update-book";

interface Props {
  slug: string;
}

export const UpdateBookPage = async ({ slug }: Props) => {
  const { book } = await getUpdateBook(slug);

  return <UpdateBookPageClient book={book} />;
};
