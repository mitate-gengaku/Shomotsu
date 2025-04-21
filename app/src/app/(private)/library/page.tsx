import { Suspense } from "react";

import { BooksListSkeleton } from "@/components/loading/books-list-skeleton";
import { LibraryPage } from "@/features/book/pages/library-page";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const Library = async ({ searchParams }: Props) => {
  const { page = "1" } = await searchParams;

  return (
    <Suspense fallback={<BooksListSkeleton />}>
      <LibraryPage page={parseInt(page)} />
    </Suspense>
  );
};

export default Library;
