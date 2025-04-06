import { db } from "@/lib/db/setup/drizzle";

export const getAllCategories = async () => {
  const categories = await db.query.categoriesTable.findMany();

  return {
    categories,
  };
};
