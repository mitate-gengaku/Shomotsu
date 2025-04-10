import { BooksPageClient } from "@/features/book/clients/new-books-page-client";
import { categoryService } from "@/services";

interface Props {
  page: number;
  categoryName: string;
}

export const ExploreCategoryPage = async ({ page, categoryName }: Props) => {
  // const response = await getCategoryBooks(page, 16, category);
  const { category } = await categoryService.getCategory(categoryName);

  return (
    <BooksPageClient
      // {...response}
      title={category?.label}
      books={[]}
    />
  );
};
