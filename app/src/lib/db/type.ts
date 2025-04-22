import * as schema from "@/lib/db/schema";

export type UserType = typeof schema.usersTable.$inferInsert;
export type CategoryType = typeof schema.categoriesTable.$inferInsert;
export type BookType = typeof schema.booksTable.$inferInsert;
export type LibraryType = typeof schema.librariesTable.$inferInsert;
export type ChapterType = typeof schema.chaptersTable.$inferInsert;
