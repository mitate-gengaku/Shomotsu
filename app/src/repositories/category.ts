import { db } from "@/lib/db/drizzle";
import { Category } from "@/types/category";

export class CategoryRepository {
  async getCategories(): Promise<Category[]> {
    const categories = await db.query.categoriesTable.findMany();

    return categories;
  }

  async getCategory(categoryName: string) {
    return await db.query.categoriesTable.findFirst({
      where: (fields, { eq }) => eq(fields.category, categoryName),
    });
  }
}
