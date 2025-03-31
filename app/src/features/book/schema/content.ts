import { z } from "zod";

export const contentSchema = z.object({
  bookId: z.string().default(""),
  slug: z.string().default(""),
  publish: z.boolean().default(false),
});
