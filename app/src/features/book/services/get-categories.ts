import { db } from "@/lib/db/drizzle";

export const getCategories = async (size: number = 8) => {
  const categories = await db.query.categoriesTable.findMany({
    limit: size,
    with: {
      books: {
        where: (book, { eq }) => eq(book.publish, true),
        limit: 8,
      },
    },
  });

  const hasBookCategories = categories.filter(
    (category) => category.books.length,
  );

  return {
    categories: hasBookCategories,
  };
};
