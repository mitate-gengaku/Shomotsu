import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { beforeEach, describe, expect, test } from "vitest";

import { Footer } from "@/components/apperance/footer";

describe("Footerコンポーネントのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  test("FC-001: コンポーネントが正常に表示されること", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    const footerTitle = screen.getByRole("heading", { level: 3 });
    const caption = screen.getByText("オンライン読書・執筆プラットフォーム");
    const supportTitle = screen.getByText("サポート");
    const xAccountLink = screen.getByText("お問い合わせ");
    const copyWright = screen.getByTestId("footer-copywright");
    const termsLink = screen.getByText("利用規約");
    const privacyPolicyLink = screen.getByText("プライバシーポリシー");

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

  test("FC-002: 利用規約画面に遷移すること", async () => {
    const user = userEvent.setup();

    render(<Footer />);

    const termsLink = screen.getByText("利用規約");
    await user.click(termsLink);

    expect(mockRouter.asPath).toBe("/legal/terms");
  });

  test("FC-003: プライバシーポリシー画面に遷移すること", async () => {
    const user = userEvent.setup();

    render(<Footer />);

    const privacyPolicyLink = screen.getByText("プライバシーポリシー");
    await user.click(privacyPolicyLink);

    expect(mockRouter.asPath).toBe("/legal/privacy");
  });

  test("FC-004: 開発者のXアカウントページに遷移すること", async () => {
    const user = userEvent.setup();

    render(<Footer />);

    const xAccountLink = screen.getByText("お問い合わせ");
    await user.click(xAccountLink);

    expect(mockRouter.asPath).toBe("/mitate_gengaku");
  });
});
