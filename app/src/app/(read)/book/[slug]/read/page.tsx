import { Suspense } from "react";

import { LoadingIconSkeleton } from "@/components/loading/loading-icon-skeleton";
import { ReadBookPage } from "@/features/book/pages/read-book-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const ReadBook = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingIconSkeleton />}>
      <ReadBookPage slug={slug} />;
    </Suspense>
  );
};

export default ReadBook;
