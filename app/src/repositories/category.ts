import { db } from "@/lib/db/drizzle";

export class CategoryRepository {
  async getCategory(categoryName: string) {
    return await db.query.categoriesTable.findFirst({
      where: (fields, { eq }) => eq(fields.category, categoryName),
    });
  }
}
