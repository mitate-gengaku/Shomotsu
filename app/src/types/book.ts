import { BookType } from "@/lib/db/type";
import { Category } from "@/types/category";
import { User } from "@/types/user";

export type BookWithAllRelations = Required<BookType> & {
  user: User;
  category: Category | null;
};

export type Book = Required<BookType>;
