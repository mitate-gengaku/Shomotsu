import { z } from "zod";

export const updateContentSchema = z.object({
  bookId: z.string().default(""),
  description: z
    .preprocess(
      (value) => (value === "" ? undefined : value),
      z
        .string({
          invalid_type_error: "文字列を入力してください",
        })
        .min(4, { message: "内容紹介は4文字以上必要です" })
        .max(192, { message: "内容紹介は192文字以下にしてください " }),
    )
    .optional(),
  content: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "コンテンツは必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .optional(),
  ),
  category: z.optional(z.preprocess((value) => (value === "" ? undefined : value), z.string())).default(undefined),
  publish: z.boolean().default(false),
});
