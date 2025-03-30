import { LibraryPageClient } from "@/features/book/clients/library-page-client";
import { getLibraryBooks } from "@/features/book/services/get-library";

interface Props {
  page: number;
}

export const LibraryPage = async ({ page }: Props) => {
  const { books, nextPage, prevPage } = await getLibraryBooks(page);

  return (
    <LibraryPageClient books={books} nextPage={nextPage} prevPage={prevPage} />
  );
};
