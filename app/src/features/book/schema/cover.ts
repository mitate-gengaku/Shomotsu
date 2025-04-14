import { z } from "zod";

export const coverSchema = z.object({
  cover: z
    .instanceof(File, {
      message: "表紙の画像は必ず選んでください",
    })
    .refine((file) => file.size < 3072, "画像ファイルのサイズは3kbまでにしてください")
    .refine((file) => ["image/png", "image/jpg"].includes(file.type), {
      message: "添付できる画像ファイルはjpegかpngです",
    }),
});
