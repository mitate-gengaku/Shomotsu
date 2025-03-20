import { z } from "zod";

export const contentSchema = z.object({
  title: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "タイトルは必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .min(6, { message: "タイトルは6文字以上必要です" })
      .max(32, { message: "タイトルは32文字以下にしてください " }),
  ),
  category: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(
      [
        "novel",
        "non-fiction",
        "self-help",
        "business",
        "science",
        "history",
        "biography",
        "travel",
        "cookbook",
        "children",
        "art",
        "computer",
        "technology,",
        "health",
        "education",
        "young_adult",
        "poetry",
        "religion",
        "sports",
      ],
      {
        required_error: "選択してください",
        message: "無効な選択です",
      },
    ),
  ),
  cover: z
    .instanceof(File, {
      message: "表紙の画像は必ず選んでください",
    })
    .refine(
      (file) => file.size < 3072,
      "画像ファイルのサイズは3kbまでにしてください",
    )
    .refine((file) => ["image/png", "image/jpg"].includes(file.type), {
      message: "添付できる画像ファイルはjpegかpngです",
    }),
  content: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({
      required_error: "コンテンツは必須入力です",
      invalid_type_error: "文字列を入力してください",
    }),
  ),
  publish: z.boolean().default(false),
});
