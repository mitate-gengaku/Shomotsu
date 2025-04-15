"use server"; // action.ts

import { auth } from "@clerk/nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { DatabaseError } from "pg";
import { ulid } from "ulid";

import { newBookSchema } from "@/features/book/schema/title";
import { bookService } from "@/services";

export async function create(prevState: unknown, formData: FormData) {
  const { userId } = await auth();

  const submission = parseWithZod(formData, {
    schema: newBookSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  let redirectTo = "";

  const values = submission.value;

  if (!userId) {
    return submission.reply();
  }

  try {
    const book = await bookService.create({
      ...values,
      id: ulid(),
      userId: userId,
    });

    redirectTo = `/book/${book[0].slug}`;
  } catch (e) {
    if (e instanceof DatabaseError) {
      const regex = /Key \((title|slug)\)=\((.*?)\) already exists\./;

      const matchKey = e.detail?.match(regex);

      return submission.reply({
        formErrors: [`「${matchKey ? matchKey[1] : ""}」はすでに使用されています`],
      });
    }
    return submission.reply();
  }

  if (redirectTo !== "") {
    redirect(redirectTo);
  }
}
