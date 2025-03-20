import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { ReactNode } from "react";
import { beforeEach, describe, expect, test, vitest } from "vitest";

import { Footer } from "@/components/layout/footer";

// ルーターのモック設定
// eslint-disable-next-line @typescript-eslint/no-require-imports
vitest.mock("next/router", () => require("next-router-mock"));

// Linkのモック設定
vitest.mock("next/link", () => {
  interface MockLinkProps {
    children: ReactNode;
    href: string;
    "data-testid": string;
  }
  const MockLink = ({
    children,
    href,
    "data-testid": dataTestid,
  }: MockLinkProps) => {
    return (
      <a
        href={href}
        onClick={() => mockRouter.push(href)}
        data-testid={dataTestid}
      >
        {children}
      </a>
    );
  };

  return { default: MockLink };
});

describe("Footerコンポーネントのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  test.skip("コンポーネントが表示される", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test.skip("タイトルが表示される", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer-title")).toBeInTheDocument();
    expect(screen.getByTestId("footer-title").textContent).toBe("Shomotsu");
  });

  test.skip("キャプションが表示される", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer-caption")).toBeInTheDocument();
    expect(screen.getByTestId("footer-caption").textContent).toBe(
      "オンライン読書・執筆プラットフォーム",
    );
  });

  test.skip("サポートセクションが表示される", () => {
    render(<Footer />);

    const expectLinkResult = ["https://x.com/mitate_gengaku"];

    const supportSection = screen.getByTestId("support");
    const supportTitle = screen.getByTestId("support-title");
    const supportLink = screen.getAllByTestId("support-link");

    expect(supportSection).toBeInTheDocument();

    expect(supportTitle).toBeInTheDocument();
    expect(supportTitle.textContent).toBe("サポート");

    supportLink.forEach(async (element) => {
      expect(element).toBeInTheDocument();
    });

    supportLink.forEach(async (element, i) => {
      userEvent.click(element);

      await waitFor(() => {
        expect(mockRouter.asPath).toBe(expectLinkResult[i]);
      });
    });
  });

  test.skip("コピーライトが表示される", () => {
    render(<Footer />);

    const copyWright = screen.getByTestId("footer-copywright");
    expect(copyWright).toBeInTheDocument();
    expect(copyWright.textContent).toBe(
      "© 2025 Shomotsu. All rights reserved.",
    );
  });

  test.skip("利用規約リンクをクリックすると/legal/termsに遷移する", async () => {
    render(<Footer />);

    const termsLink = screen.getByTestId("footer-terms-link");

    const user = userEvent.setup();

    await user.click(termsLink);

    expect(mockRouter.asPath).toBe("/legal/terms");
  });

  test.skip("プライバシーポリシーリンクをクリックすると/legal/privacyに遷移する", async () => {
    render(<Footer />);

    const privacyLink = screen.getByTestId("footer-privacy-link");

    const user = userEvent.setup();

    await user.click(privacyLink);

    expect(mockRouter.asPath).toBe("/legal/privacy");
  });
});
