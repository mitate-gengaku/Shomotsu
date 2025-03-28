import { z } from "zod";

import { userNameSchema } from "@/features/user/schema/username-schema";

export type UserNameType = z.infer<typeof userNameSchema>;
