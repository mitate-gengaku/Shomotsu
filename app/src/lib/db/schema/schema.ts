import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
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
  user_id: text("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  category_id: text("category_id")
    .notNull()
    .references(() => categoriesTable.id),
  title: varchar({ length: 28 }).notNull(),
  description: varchar({ length: 192 }).notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  cover: text("cover").notNull(),
  publish: boolean("publish").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

/**
 * relation
 */
export const userRelations = relations(usersTable, ({ many }) => ({
  books: many(booksTable),
}));

export const bookRelations = relations(booksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [booksTable.user_id],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [booksTable.category_id],
    references: [categoriesTable.id],
  }),
}));

export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  books: many(booksTable),
}));
