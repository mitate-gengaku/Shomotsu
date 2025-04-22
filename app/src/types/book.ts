import { BookType } from "@/lib/db/type";
import { Category } from "@/types/category";
import { Chapter } from "@/types/chapter";
import { User } from "@/types/user";

export type BookWithAllRelations = Required<BookType> & {
  user: Omit<User, "email" | "createdAt" | "updatedAt">;
  category: Category | null;
  chapters: Chapter[];
};

export type Book = Required<BookType>;
