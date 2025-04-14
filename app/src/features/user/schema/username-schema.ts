import { z } from "zod";

import { forbiddenUserName } from "@/config/forbidden-username";

export const userNameSchema = z.object({
  username: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "ユーザーネームは必須入力です",
        invalid_type_error: "文字列を入力してください",
      })
      .min(6, { message: "ユーザーネームは6文字以上必要です" })
      .max(32, { message: "ユーザーネームは32文字以下にしてください " })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: "ユーザーネームには英数字、アンダースコア(_)、ハイフン(-)のみ使用できます",
      })
      .refine((name) => !forbiddenUserName.includes(name.toLowerCase()), {
        message: "このユーザーネームは使用できません",
      }),
  ),
});
