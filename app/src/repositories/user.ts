import { eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { usersTable } from "@/lib/db/schema";
import { UserType } from "@/lib/db/type";
import { UpdateUserValues } from "@/types/user";

export class UserRepository {
  async create(values: UserType) {
    return await db.insert(usersTable).values(values);
  }

  async update(id: string, values: UpdateUserValues) {
    return await db.update(usersTable).set(values).where(eq(usersTable.id, id));
  }
}
