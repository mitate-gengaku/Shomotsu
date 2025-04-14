import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, varchar, primaryKey } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const categoriesTable = pgTable("categories_table", {
  id: text("id").notNull().primaryKey(),
  category: text("category").notNull().unique(),
  label: text("label").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const booksTable = pgTable("books_table", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  categoryId: text("categoryId").references(() => categoriesTable.id),
  title: varchar({ length: 28 }).notNull().unique(),
  description: varchar({ length: 192 }).notNull().default(""),
  slug: varchar({ length: 192 }).notNull().unique(),
  toc: text("toc").array().notNull().default([]),
  cover: text("cover"),
  content: text("content"),
  publish: boolean("publish").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const chaptersTable = pgTable("chapters_table", {
  id: text("id").notNull().primaryKey(),
  bookId: text("bookId").references(() => booksTable.id),
  title: varchar({ length: 28 }).notNull(),
  content: text("content").notNull(),
  publish: boolean("publish").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const librariesTable = pgTable(
  "libraries",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    bookId: text("bookId")
      .notNull()
      .references(() => booksTable.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.bookId] })],
);

/**
 * relation
 */
export const userRelations = relations(usersTable, ({ many }) => ({
  books: many(booksTable),
}));

export const bookRelations = relations(booksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [booksTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [booksTable.categoryId],
    references: [categoriesTable.id],
  }),
}));

export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  books: many(booksTable),
}));

export const librariesRelations = relations(librariesTable, ({ one }) => ({
  book: one(booksTable, {
    fields: [librariesTable.bookId],
    references: [booksTable.id],
  }),
  user: one(usersTable, {
    fields: [librariesTable.userId],
    references: [usersTable.id],
  }),
}));
