import { setupWorker } from "msw/browser";

import { handlers } from "@/lib/msw/setup/handler";

export const worker = setupWorker(...handlers);
