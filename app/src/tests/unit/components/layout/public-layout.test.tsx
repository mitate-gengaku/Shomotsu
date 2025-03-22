import PublicLayout from "@/app/(public)/layout";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { describe, expect, test } from "vitest";


const mockPropsComponent = <h1>Hello World</h1>;

describe("PublicLayoutコンポーネントのテスト", () => {
  test("PL-001: コンポーネントが正常に表示されること", () => {
    render(<PublicLayout>{mockPropsComponent}</PublicLayout>);

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

  test("PL-002: Propsが正しく画面上にレンダリングされる", () => {
    render(<PublicLayout>{mockPropsComponent}</PublicLayout>);

    const propsComponent = screen.getByRole("heading", {
      level: 1,
      name: "Hello World",
    });
    expect(propsComponent).toBeInTheDocument();

    render(<PublicLayout>Good Morning</PublicLayout>);

    const textProps = screen.getByText("Good Morning");
    expect(textProps).toBeInTheDocument();
  });

  test("PL-003: 利用規約画面に遷移すること", async () => {
    const user = userEvent.setup();

    render(<PublicLayout>{mockPropsComponent}</PublicLayout>);

    const termsLink = screen.getByText("利用規約");
    await user.click(termsLink);

    expect(mockRouter.asPath).toBe("/legal/terms");
  });

  test("PL-004: プライバシーポリシー画面に遷移すること", async () => {
    const user = userEvent.setup();

    render(<PublicLayout>{mockPropsComponent}</PublicLayout>);

    const privacyPolicyLink = screen.getByText("プライバシーポリシー");
    await user.click(privacyPolicyLink);

    expect(mockRouter.asPath).toBe("/legal/privacy");
  });

  test("PL-005: 開発者のXアカウントページに遷移すること", async () => {
    const user = userEvent.setup();

    render(<PublicLayout>{mockPropsComponent}</PublicLayout>);

    const xAccountLink = screen.getByText("お問い合わせ");
    await user.click(xAccountLink);

    expect(mockRouter.asPath).toBe("/mitate_gengaku");
  });
});
