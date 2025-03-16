import { RequestHandler } from "msw";

import { getBookHandler } from "@/lib/msw/handlers/get-book";

export const handlers: RequestHandler[] = [
  getBookHandler,
];
