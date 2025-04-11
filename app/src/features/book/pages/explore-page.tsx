import { BooksPageClient } from "@/features/book/clients/new-books-page-client";
import { bookService } from "@/services";

interface Props {
  page: number;
}

export const ExplorePage = async ({ page }: Props) => {
  const result = await bookService.getBooksSortByCreatedAt(page);

  return (
    <div data-testid="explore-page">
      <BooksPageClient {...result} />
    </div>
  );
};
