import { z } from "zod";

export const titleSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "タイトルは必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .min(6, { message: "タイトルは6文字以上必要です" })
      .max(32, { message: "タイトルは32文字以下にしてください" }),
  ),
});
