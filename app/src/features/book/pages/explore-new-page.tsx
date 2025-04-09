import { BooksPageClient } from "@/features/book/clients/new-books-page-client";
import { getExploreBooks } from "@/features/book/services/get-explore-books";

interface Props {
  page: number;
}

export const ExploreNewPage = async ({ page }: Props) => {
  const response = await getExploreBooks(page);

  return <BooksPageClient {...response} />;
};
