import { db } from "@/lib/db/drizzle";

export const getAllCategories = async () => {
  const categories = await db.query.categoriesTable.findMany();

  return {
    categories,
  };
};
