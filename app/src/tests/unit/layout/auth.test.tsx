import { render, screen } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

import AuthLayout from "@/app/(auth)/layout";

vitest.mock("@/components/layout/auth-header", () => ({
  AuthHeader: () => <header data-testid="header">Header</header>,
}));

describe("Authレイアウトコンポーネントのテスト", async () => {
  test("コンポーネントが正常に表示される", () => {
    render(
      <html>
        <body>
          <AuthLayout>Authレイアウト</AuthLayout>
        </body>
      </html>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
