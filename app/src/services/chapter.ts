import { and, eq } from "drizzle-orm";

import { chaptersTable } from "@/lib/db/schema";
import { ChapterRepository } from "@/repositories/chapters";

export class ChapterService {
  constructor(private chapterRepository: ChapterRepository) {
    this.chapterRepository = chapterRepository;
  }

  async getChapters(userId: string | null, bookId: string | null) {
    const where = and(eq(chaptersTable.userId, userId ?? ""), eq(chaptersTable.bookId, bookId ?? ""));

    return await this.chapterRepository.findChapters(where);
  }
}
