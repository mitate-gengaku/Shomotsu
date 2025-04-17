import { Suspense } from "react";

import { BooksListSkeleton } from "@/components/loading/books-list-skeleton";
import { ExplorePage } from "@/features/book/pages/explore-page";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const Explore = async ({ searchParams }: Props) => {
  const { page = "1" } = await searchParams;

  return (
    <Suspense fallback={<BooksListSkeleton />}>
      <ExplorePage page={parseInt(page)} />
    </Suspense>
  );
};
export default Explore;
