import { render, screen } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

import LegalLayout from "@/app/(legal)/layout";

vitest.mock("@/components/layout/header", () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vitest.mock("@/components/layout/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("Legalレイアウトコンポーネントのテスト", async () => {
  test.skip("コンポーネントが正常に表示される", () => {
    render(
      <html>
        <body>
          <LegalLayout>Legalレイアウト</LegalLayout>
        </body>
      </html>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
