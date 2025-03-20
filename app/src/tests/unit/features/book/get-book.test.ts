import { afterEach } from "node:test";

import { redirect } from "next/navigation";
import mockRouter from "next-router-mock";
import { beforeEach } from "vitest";
import { afterAll, beforeAll, describe, expect, test, vitest } from "vitest";

import { getBook } from "@/features/book/services/get-book";
import { server } from "@/lib/msw/setup/server";

vitest.mock("next/navigation", () => ({
  redirect: vitest.fn(),
}));

describe("getBookのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test.skip("本のIDが一致する場合、本のデータが返る", async () => {
    const bookId = "238A26BF-C676-4FFA-BF17-73D673D35B6B";
    const book = await getBook(bookId);

    expect(book).toBeDefined();
    expect(book.id).toBe(bookId);
    expect(book.title).toBe("銀河鉄道の夜");
    expect(redirect).not.toHaveBeenCalled();
  });

  test.skip("レスポンスがnullの場合、/not-foundにリダイレクトする", async () => {
    const bookId = "238A26BF-C676-4FFA-BF17-73D673D35B6Ba";

    await getBook(bookId);

    expect(redirect).toHaveBeenCalledWith("/not-found");
  });
});
