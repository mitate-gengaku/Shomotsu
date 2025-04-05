import { z } from "zod";

export const updateContentSchema = z.object({
  bookId: z.string().default(""),
  slug: z.string().default(""),
  publish: z.boolean().default(false),
});
