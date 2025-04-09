import { LibraryType } from "@/lib/db/type";
import { Book } from "@/types/book";

export type LibraryWithOutUser = LibraryType & {
  book: Book;
};
