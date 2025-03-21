import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Header } from "@/components/apperance/header";

describe("Headerコンポーネントのテスト", () => {
  test("HC-001: コンポーネントが正常に表示されること", () => {
    render(<Header />);

    const header = screen.getByTestId("header");
    const logo = header.querySelector("h1");
    const loginButton = screen.getByRole("button", { name: "ログイン" });
    const signUpButton = screen.getByRole("button", { name: "今すぐ始める" });

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toBe("Shomotsu");
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});
