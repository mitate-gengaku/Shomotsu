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
  description: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "内容紹介は必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .min(4, { message: "内容紹介は4文字以上必要です" })
      .max(192, { message: "内容紹介は192文字以下にしてください " })
  ),
  slug: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "スラグは必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .min(4, { message: "スラグは4文字以上必要です" })
      .max(192, { message: "スラグは192文字以下にしてください " })
      .regex(
        /^[a-z]+(?:-[a-z]+)*$/,
        "スラグは小文字のアルファベット、数字、ハイフンのみを使用でき、ハイフンは連続したり、先頭や末尾に来てはいけません"
      )
      .refine(
        (val) => /[a-z]-[a-z]/.test(val),
        "スラグには最低でも '[a-z]-[a-z]' の形式（アルファベットの小文字-アルファベットの小文字）を含む必要があります"
      )    
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
