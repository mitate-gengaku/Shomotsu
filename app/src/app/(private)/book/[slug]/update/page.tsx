import React, { Suspense } from "react";

import { UpdateBookPageSkeleton } from "@/components/loading/update-book-skeleton";
import { UpdateBookPage } from "@/features/book/pages/update-book-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const UpdateBook = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<UpdateBookPageSkeleton />}>
      <UpdateBookPage slug={slug} />
    </Suspense>
  );
};

export default UpdateBook;
