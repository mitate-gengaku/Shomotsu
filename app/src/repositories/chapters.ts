import { SQL } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";

export class ChapterRepository {
  async findChapters(where?: SQL | undefined, orderBy?: SQL | undefined, offset?: number, limit?: number) {
    return await db.query.chaptersTable.findMany({
      where: where,
      offset: offset,
      limit: limit,
      orderBy: orderBy,
    });
  }
}
