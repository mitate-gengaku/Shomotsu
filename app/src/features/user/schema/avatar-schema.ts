import { z } from "zod";

export const avatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size < 4096,
      "画像ファイルのサイズは4kbまでにしてください",
    )
    .refine((file) => ["image/png", "image/jpg"].includes(file.type), {
      message: "添付できる画像ファイルはjpegかpngです",
    }),
});
