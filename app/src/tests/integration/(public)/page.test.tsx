import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { describe, expect, test } from "vitest";

import LandingLayout from "@/app/(public)/layout";
import { LandingPage } from "@/features/landing/page/ladning-page";

describe("トップ画面(Landingページ)のテスト", () => {
  test("TP-001: トップ画面のUIが正常に表示されること", () => {
    render(
      <LandingLayout>
        <LandingPage />
      </LandingLayout>,
    );

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

  test.skip("TP-002: ログイン画面に遷移すること");
  test.skip("TP-003: サインアップ画面に遷移すること");
  test("TP-004: 利用規約画面に遷移", async () => {
    const user = userEvent.setup();

    render(
      <LandingLayout>
        <LandingPage />
      </LandingLayout>,
    );

    const termsLink = screen.getByText("利用規約");
    await user.click(termsLink);

    expect(mockRouter.asPath).toBe("/legal/terms");
  });
  test("TP-005: プライバシーポリシー画面に遷移", async () => {
    const user = userEvent.setup();

    render(
      <LandingLayout>
        <LandingPage />
      </LandingLayout>,
    );

    const privacyPolicyLink = screen.getByText("プライバシーポリシー");
    await user.click(privacyPolicyLink);

    expect(mockRouter.asPath).toBe("/legal/privacy");
  });

  test("TP-006: 開発者のXアカウントページに遷移", async () => {
    const user = userEvent.setup();

    render(
      <LandingLayout>
        <LandingPage />
      </LandingLayout>,
    );

    const xAccountLink = screen.getByText("お問い合わせ");
    await user.click(xAccountLink);

    expect(mockRouter.asPath).toBe("/mitate_gengaku");
  });
});
