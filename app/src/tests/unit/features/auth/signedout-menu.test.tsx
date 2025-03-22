import { SignedOutMenu } from "@/features/auth/components/signedout-menu";
import { SignOutButton } from "@/features/auth/components/signout-button";
import { mockSignOut } from "@/tests/setup/mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

describe("SignedOutMenuコンポーネントのテスト", () => {
  test("SOMC-001: SignedOutMenuコンポーネントのUIが正常に表示されること", () => {
    render(<SignedOutMenu />)

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    const signUpButton = screen.getByRole("button", { name: "今すぐ始める" });

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  })

  test("SOBC-002: モバイルサイズのとき、ボタンがスモールサイズで表示されること", async () => {
    render(<SignedOutMenu isMobile />)

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    const signUpButton = screen.getByRole("button", { name: "今すぐ始める" });

    screen.debug()
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.classList).toContain("h-8")
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton.classList).toContain("h-8")
  })
})