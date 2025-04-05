import { z } from "zod";

import { updateContentSchema } from "@/features/book/schema/update-content";

export type UpdateContentType = z.infer<typeof updateContentSchema>;
