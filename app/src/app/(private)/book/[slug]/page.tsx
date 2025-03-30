import React from "react";

import { BookInfoPage } from "@/features/book/pages/book-info-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const BookInfo = async ({ params }: Props) => {
  const { slug } = await params;

  return <BookInfoPage slug={slug} />;
};

export default BookInfo;
