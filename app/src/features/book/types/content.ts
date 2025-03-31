import { z } from "zod";

import { contentSchema } from "@/features/book/schema/content";

export type ContentType = z.infer<typeof contentSchema>;
