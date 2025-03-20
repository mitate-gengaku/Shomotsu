import { afterEach } from "node:test";

import mockRouter from "next-router-mock";
import { beforeEach } from "vitest";
import { afterAll, beforeAll, describe, expect, test, vitest } from "vitest";

import { deleteBook } from "@/features/book/services/delete-book";
import { server } from "@/lib/msw/setup/server";

vitest.mock("next/navigation", () => ({
  redirect: vitest.fn(),
}));

describe("deleteBookのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    global.fetch = vitest.fn();
  });
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    vitest.clearAllMocks();
  });

  test.skip("本のIDが一致する場合、正常に削除できる", async () => {
    const mockResponse = {
      ok: true,
      json: vitest.fn().mockResolvedValue({ message: "本を削除しました" }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValue(mockResponse);

    const bookId = "238A26BF-C676-4FFA-BF17-73D673D35B6B";
    const result = await deleteBook(bookId);

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/api/books/${bookId}`,
      { method: "DELETE" },
    );
    expect(result).toEqual({ message: "本を削除しました" });
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test.skip("本のIDが一致しない場合、Not Foundエラーが返る", async () => {
    const mockResponse = {
      ok: false,
      statusText: "Not Found",
      json: vitest.fn().mockResolvedValue({ message: "Not Found" }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValue(mockResponse);

    const bookId = "456";
    await expect(deleteBook(bookId)).rejects.toThrow("Not Found");

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/api/books/${bookId}`,
      { method: "DELETE" },
    );
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
