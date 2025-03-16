import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { ResolvingMetadata } from "next";
import { describe, expect, test, vitest } from "vitest";

import Page, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "@/app/(legal)/legal/[slug]/page";

type Props = {
  params: {
    slug: string;
  };
};

vitest.mock("@/contents/privacy.mdx", () => ({
  default: () => <div data-testid="privacy-content">Privacy Content</div>,
}));

vitest.mock("@/contents/terms.mdx", () => ({
  default: () => <div data-testid="terms-content">Terms Content</div>,
}));

describe("Legalページのテスト", () => {
  test("ページが正常に表示される", async () => {
    const params = Promise.resolve({ slug: "privacy" });

    render(await Page({ params }));

    expect(screen.getByTestId("privacy-content")).toBeInTheDocument();
    expect(screen.getByTestId("privacy-content")).toHaveTextContent(
      "Privacy Content",
    );
  });

  test("利用規約ページを正しく表示する", async () => {
    const params = Promise.resolve({ slug: "terms" });

    render(await Page({ params }));

    expect(screen.getByTestId("terms-content")).toBeInTheDocument();
    expect(screen.getByTestId("terms-content")).toHaveTextContent(
      "Terms Content",
    );
  });

  test("正しい静的パラメータを生成する", () => {
    const params = generateStaticParams();
    expect(params).toEqual([
      { slug: "terms", ja: "利用規約" },
      { slug: "privacy", ja: "プライバシーポリシー" },
    ]);
  });

  test("dynamicParamsがfalseに設定されている", () => {
    expect(dynamicParams).toBe(false);
  });

  test("動的にSEOタグが設定される", async () => {
    const props: Props = { params: { slug: "terms" } };
    const parent = Promise.resolve({
      title: "デフォルトタイトル",
    }) as unknown as ResolvingMetadata;

    const metadata = await generateMetadata(props, parent);

    expect(metadata.title).toBe("利用規約 | Shomotsu");
    expect(metadata.openGraph?.title).toBe("利用規約 | Shomotsu");
    expect(metadata.twitter?.title).toBe("利用規約 | Shomotsu");
  });

  test("親のタイトルが存在しない場合、空文字列が使用されること", async () => {
    const props: Props = { params: { slug: "non-existent" } };
    const parent = Promise.resolve({}) as ResolvingMetadata;

    const metadata = await generateMetadata(props, parent);

    expect(metadata.title).toBe("Shomotsu");
    expect(metadata.openGraph?.title).toBe("Shomotsu");
    expect(metadata.twitter?.title).toBe("Shomotsu");
  });
});
