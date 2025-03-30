import { LibraryType } from "@/lib/db/types/type";
import { Book } from "@/types/book";

export type LibraryWithOutUser = LibraryType & {
  book: Book;
};
