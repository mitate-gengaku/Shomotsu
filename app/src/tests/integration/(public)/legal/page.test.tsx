import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResolvingMetadata } from "next";
import mockRouter from "next-router-mock";
import { describe, expect, test } from "vitest";

import PublicLayout from "@/app/(public)/layout";
import Legal, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(public)/legal/[slug]/page";

type Props = {
  params: {
    slug: string;
  };
};

describe("法的画面のテスト", () => {
  test("LP-001: 法的画面のUIが正常に表示されること", async () => {
    const params = Promise.resolve({ slug: "privacy" });

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    // Header
    const header = screen.getByTestId("header");
    const logo = header.querySelector("h1");
    const loginButton = screen.getByRole("button", { name: "ログイン" });
    const signUpButton = screen.getByRole("button", { name: "今すぐ始める" });

    // Footer
    const footer = screen.getByTestId("footer");
    const footerTitle = screen.getByRole("heading", { level: 3 });
    const caption = screen.getByText("オンライン読書・執筆プラットフォーム");
    const supportTitle = screen.getByText("サポート");
    const xAccountLink = screen.getByText("お問い合わせ");
    const copyWright = screen.getByTestId("footer-copywright");
    const termsLink = screen.getByText("利用規約");
    const privacyPolicyLink = screen.getByText("プライバシーポリシー");

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toBe("Shomotsu");
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(footer).toBeInTheDocument();
    expect(footerTitle).toBeInTheDocument();
    expect(caption).toBeInTheDocument();
    expect(supportTitle).toBeInTheDocument();
    expect(xAccountLink).toBeInTheDocument();
    expect(copyWright).toBeInTheDocument();
    expect(copyWright.textContent).toBe(
      "© 2025 Shomotsu. All rights reserved.",
    );
    expect(termsLink).toBeInTheDocument();
    expect(privacyPolicyLink).toBeInTheDocument();
  });

  test.skip("LP-002: ログイン画面に遷移すること");
  test.skip("LP-003: サインアップ画面に遷移すること");

  test("LP-004: 利用規約画面に遷移こと", async () => {
    const user = userEvent.setup();

    const params = Promise.resolve({ slug: "privacy" });

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    const termsLink = screen.getByText("利用規約");
    await user.click(termsLink);

    expect(mockRouter.asPath).toBe("/legal/terms");
  });

  test("LP-005: プライバシーポリシー画面に遷移こと", async () => {
    const user = userEvent.setup();

    const params = Promise.resolve({ slug: "privacy" });

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    const privacyPolicyLink = screen.getByText("プライバシーポリシー");
    await user.click(privacyPolicyLink);

    expect(mockRouter.asPath).toBe("/legal/privacy");
  });

  test("LP-006: 開発者のXアカウントページに遷移こと", async () => {
    const user = userEvent.setup();

    const params = Promise.resolve({ slug: "privacy" });

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    const xAccountLink = screen.getByText("お問い合わせ");
    await user.click(xAccountLink);

    expect(mockRouter.asPath).toBe("/mitate_gengaku");
  });

  test("LP-007: slug(クエリーパラメータ)がtermsの場合、利用規約のコンテンツを表示すること", async () => {
    const params = Promise.resolve({ slug: "terms" });
    const parent = Promise.resolve({
      title: "デフォルトタイトル",
    }) as unknown as ResolvingMetadata;
    const props: Props = { params: { slug: "terms" } };

    const metadata = await generateMetadata(props, parent);

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    const termsContent = screen.getByTestId("terms-content");

    expect(termsContent).toHaveTextContent("Terms Content");
    expect(metadata.title).toBe("利用規約 | Shomotsu");
    expect(metadata.openGraph?.title).toBe("利用規約 | Shomotsu");
    expect(metadata.twitter?.title).toBe("利用規約 | Shomotsu");
  });
  test("LP-008: slug(クエリーパラメータ)がpriavcyの場合、プライバシーポリシーのコンテンツを表示すること", async () => {
    const params = Promise.resolve({ slug: "privacy" });
    const parent = Promise.resolve({
      title: "デフォルトタイトル",
    }) as unknown as ResolvingMetadata;
    const props: Props = { params: { slug: "privacy" } };

    const metadata = await generateMetadata(props, parent);

    render(await Legal({ params }), {
      wrapper: (props) => <PublicLayout>{props.children}</PublicLayout>,
    });

    const privacyContent = screen.getByTestId("privacy-content");

    expect(privacyContent).toHaveTextContent("Privacy Content");
    expect(metadata.title).toBe("プライバシーポリシー | Shomotsu");
    expect(metadata.openGraph?.title).toBe("プライバシーポリシー | Shomotsu");
    expect(metadata.twitter?.title).toBe("プライバシーポリシー | Shomotsu");
  });

  test("LP-009: 正しい静的パラメータを生成する", async () => {
    const params = generateStaticParams();
    expect(params).toEqual([
      { slug: "terms", ja: "利用規約" },
      { slug: "privacy", ja: "プライバシーポリシー" },
    ]);
  });

  test("LP-010: 親のタイトルが存在しない場合、空文字列が使用されること", async () => {
    const props: Props = { params: { slug: "non-existent" } };
    const parent = Promise.resolve({}) as ResolvingMetadata;

    const metadata = await generateMetadata(props, parent);

    expect(metadata.title).toBe("Shomotsu");
    expect(metadata.openGraph?.title).toBe("Shomotsu");
    expect(metadata.twitter?.title).toBe("Shomotsu");
  });
});
