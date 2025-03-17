import { RequestHandler } from "msw";

import { deleteBookHandler } from "@/lib/msw/handlers/delete-book";
import { getBookHandler } from "@/lib/msw/handlers/get-book";

export const handlers: RequestHandler[] = [
  // Book
  getBookHandler,
  deleteBookHandler,
];
