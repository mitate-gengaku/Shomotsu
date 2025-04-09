import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/lib/db/schema";

config({ path: ".env.local" });

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql, { schema });
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
  schema,
});
