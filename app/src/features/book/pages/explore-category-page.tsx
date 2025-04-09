import { BooksPageClient } from "@/features/book/clients/new-books-page-client";
import { getCategoryBooks } from "@/features/book/services/get-category-books";

interface Props {
  page: number;
  category: string;
}

export const ExploreCategoryPage = async ({ page, category }: Props) => {
  const response = await getCategoryBooks(page, 16, category);

  return <BooksPageClient {...response} />;
};
