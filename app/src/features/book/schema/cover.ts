import { z } from "zod";

export const coverSchema = z.object({
  cover: z.optional(
    z
      .instanceof(File, {
        message: "表紙の画像は必ず選んでください",
      })
      .refine((file) => file.size < 10240, "画像ファイルのサイズは10kBまでにしてください")
      .refine((file) => ["image/png", "image/jpg"].includes(file.type), {
        message: "添付できる画像ファイルはjpegかpngです",
      }),
  ),
});
