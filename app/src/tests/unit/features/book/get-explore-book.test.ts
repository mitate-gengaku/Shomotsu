import { afterEach } from "node:test";

import mockRouter from "next-router-mock";
import { beforeEach } from "vitest";
import { afterAll, beforeAll, describe, expect, test, vitest } from "vitest";

import { getExploreBooks } from "@/features/book/services/explore-books";
import { server } from "@/lib/msw/setup/server";

vitest.mock("next/navigation", () => ({
  redirect: vitest.fn(),
}));

describe("getExploreBooksのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test("本のIDが一致する場合、本のデータが返る", async () => {
    const book = await getExploreBooks();

    expect(book.length).toBe(10);
  });
});
