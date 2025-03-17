import { RequestHandler } from "msw";

import { deleteBookHandler } from "@/lib/msw/handlers/delete-book";
import { getBookHandler } from "@/lib/msw/handlers/get-book";
import { getExploreBooks } from "@/features/book/services/explore-books";
import { getExploreBooksHandler } from "@/lib/msw/handlers/explore-books";

export const handlers: RequestHandler[] = [
  // Book
  getBookHandler,
  deleteBookHandler,
  getExploreBooksHandler,
];
