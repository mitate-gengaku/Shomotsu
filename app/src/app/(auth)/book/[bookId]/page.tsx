import React from "react";

import { BookDetail } from "@/features/book/pages/book-detail";

const BookDetailPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  return <BookDetail bookId={bookId} />;
};

export default BookDetailPage;
