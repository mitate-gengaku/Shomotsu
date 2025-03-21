import mockRouter from "next-router-mock";
import { ReactNode } from "react";
import { vitest } from "vitest";

/**
 * Landingページ
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
vitest.mock("next/router", () => require("next-router-mock"));

// Linkのモック設定
// モックの参考 [モックの参考](https://zenn.dev/ryo_tsukada/articles/cc23fa9cf94c25)

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

/**
 * Legalページ
 */
vitest.mock("@/contents/privacy.mdx", () => ({
  default: () => <div data-testid="privacy-content">Privacy Content</div>,
}));

vitest.mock("@/contents/terms.mdx", () => ({
  default: () => <div data-testid="terms-content">Terms Content</div>,
}));
