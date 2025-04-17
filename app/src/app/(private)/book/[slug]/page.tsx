import React, { Suspense } from "react";

import { BookInfoPageSkeleton } from "@/components/loading/book-info-skeleton";
import { BookInfoPage } from "@/features/book/pages/book-info-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const BookInfo = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<BookInfoPageSkeleton />}>
      <BookInfoPage slug={slug} />
    </Suspense>
  );
};

export default BookInfo;
