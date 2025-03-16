import { setupServer } from "msw/node";

import { handlers } from "@/lib/msw/setup/handler";

export const server = setupServer(...handlers);
