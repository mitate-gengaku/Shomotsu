"use server";

import { auth } from "@clerk/nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateContentSchema } from "@/features/book/schema/update-content";
import { generateToc } from "@/features/book/utils/generate-toc";
import { BookType } from "@/lib/db/type";
import { bookService } from "@/services";

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
    content: content ? content : "",
    cover: cover ? cover : undefined,
    toc,
    publish,
  };

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
