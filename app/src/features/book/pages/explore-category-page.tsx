import { auth } from "@clerk/nextjs/server";

import { BooksPageClient } from "@/features/book/clients/new-books-page-client";
import { bookService, categoryService } from "@/services";

interface Props {
  page: number;
  categoryName: string;
}

export const ExploreCategoryPage = async ({ page, categoryName }: Props) => {
  const { userId } = await auth();
  const { category } = await categoryService.getCategory(categoryName);
  const result = await bookService.getBooksWithCategoryIdSortByCreatedAt(page, userId, category?.id);

  return (
    <div data-testid="explore-category-page">
      <BooksPageClient {...result} title={category?.label} />
    </div>
  );
};
