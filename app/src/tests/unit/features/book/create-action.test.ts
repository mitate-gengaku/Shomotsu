import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { describe, expect, Mock, test, vitest } from "vitest";
import { beforeEach } from "vitest";

import { create } from "@/features/book/actions/create";
import { contentSchema } from "@/features/book/schema/content";

vitest.mock("@conform-to/zod", () => ({
  parseWithZod: vitest.fn(),
}));

vitest.mock("next/navigation", () => ({
  redirect: vitest.fn(),
}));

vitest.mock("@/features/book/schema/content", () => ({
  contentSchema: {},
}));

describe("create server action", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test.skip("バリデーション成功時にリダイレクトする", async () => {
    (parseWithZod as Mock).mockReturnValue({
      status: "success",
      value: { title: "テストタイトル", content: "テスト本文" },
    });

    const formData = new FormData();
    formData.append("title", "テストタイトル");
    formData.append("content", "テスト本文");

    await create(null, formData);

    expect(parseWithZod).toHaveBeenCalledWith(formData, {
      schema: contentSchema,
    });

    expect(redirect).toHaveBeenCalledWith(
      "/book/238A26BF-C676-4FFA-BF17-73D673D35B6B",
    );
  });

  test.skip("バリデーション失敗時にsubmission.replyを返す", async () => {
    const mockReply = { errors: { title: ["必須項目です"] } };
    const mockSubmission = {
      status: "error",
      reply: vitest.fn().mockReturnValue(mockReply),
    };

    (parseWithZod as Mock).mockReturnValue(mockSubmission);

    const formData = new FormData();

    const result = await create(null, formData);

    expect(parseWithZod).toHaveBeenCalledWith(formData, {
      schema: contentSchema,
    });

    expect(redirect).not.toHaveBeenCalled();

    expect(mockSubmission.reply).toHaveBeenCalled();

    expect(result).toEqual(mockReply);
  });
});
