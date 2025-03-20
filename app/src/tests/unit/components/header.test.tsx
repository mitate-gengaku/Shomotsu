import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Header } from "@/components/layout/header";

describe("Headerコンポーネントのテスト", () => {
  test.skip("コンポーネントが表示される", () => {
    render(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test.skip("ログイン, 今すぐ始めるというラベルのついたボタンが表示される", () => {
    render(<Header />);

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    const signUpButton = screen.getByRole("button", { name: "今すぐ始める" });

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});
