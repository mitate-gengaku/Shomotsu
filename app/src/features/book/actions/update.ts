"use server";

import { auth } from "@clerk/nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ulid } from "ulid";

import { updateContentSchema } from "@/features/book/schema/update-content";
import { generateContents } from "@/features/book/utils/generate-contents";
import { generateToc } from "@/features/book/utils/generate-toc";
import { db } from "@/lib/db/drizzle";
import { chaptersTable } from "@/lib/db/schema";
import { BookType } from "@/lib/db/type";
import { bookService, chapterService } from "@/services";

export async function update(prevState: unknown, formData: FormData) {
  const { userId } = await auth();

  if (!userId) redirect("/signin");

  const submission = parseWithZod(formData, {
    schema: updateContentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { category, bookId, description, content, cover, publish } = submission.value;

  const toc = generateToc(content ?? "");

  const values: Partial<BookType> = {
    categoryId: category,
    description: description ? description : "",
    cover: cover ? cover : undefined,
    toc,
    publish,
  };

  const contents = generateContents(content);

  await db.transaction(async (tx) => {
    if (!contents.length) {
      await tx
        .delete(chaptersTable)
        .where(and(eq(chaptersTable.userId, userId ?? ""), eq(chaptersTable.bookId, bookId ?? "")));
    }

    const chapters = await chapterService.getChapters(userId, bookId);

    if (chapters.length > contents.length) {
      const chapterIdsToDelete = chapters.slice(contents.length).map((chapter) => chapter.id);

      if (chapterIdsToDelete.length) {
        await tx
          .delete(chaptersTable)
          .where(
            and(
              eq(chaptersTable.userId, userId ?? ""),
              eq(chaptersTable.bookId, bookId ?? ""),
              inArray(chaptersTable.id, chapterIdsToDelete),
            ),
          );
      }
    }

    // const chapterValues = contents.map((content, i) => ())
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];

      if (i < chapters.length) {
        await tx
          .update(chaptersTable)
          .set({
            title: toc[i].replaceAll(/[\r\n]/g, "") ?? "",
            content: content,
          })
          .where(
            and(
              eq(chaptersTable.id, chapters[i].id),
              eq(chaptersTable.userId, userId ?? ""),
              eq(chaptersTable.bookId, bookId ?? ""),
            ),
          );
      } else {
        await tx.insert(chaptersTable).values({
          id: ulid(),
          userId: userId ?? "",
          bookId: bookId ?? "",
          title: toc[i].replaceAll(/[\r\n]/g, "") ?? "",
          content: content,
        });
      }
    }
  });

  const { status, result } = await bookService.update(userId, bookId, values);

  if (status) {
    revalidatePath(result);
    redirect(result);
  } else {
    return submission.reply({
      formErrors: [result],
    });
  }
}
