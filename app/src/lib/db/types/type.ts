import * as schema from "@/lib/db/schema/schema";

export type UserType = typeof schema.usersTable.$inferInsert;
export type CategoryType = typeof schema.categoriesTable.$inferInsert;
export type BookType = typeof schema.booksTable.$inferInsert;
