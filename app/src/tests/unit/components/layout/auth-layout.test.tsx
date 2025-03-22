import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import AuthLayout from "@/app/(auth)/layout";

describe("AuthLayoutコンポーネントのテスト", () => {
  test("AL-001: AuthLayoutコンポーネントのUIが正常に表示されること", () => {
    render(
      <AuthLayout>
        <h2>Good Morning</h2>
      </AuthLayout>,
    );

    const message = screen.getByRole("heading", { level: 2 });
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe("Good Morning");
  });
});
