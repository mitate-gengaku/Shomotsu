import { z } from "zod";

import { newBookSchema } from "@/features/book/schema/title";

export type NewBookSchemaType = z.infer<typeof newBookSchema>;
