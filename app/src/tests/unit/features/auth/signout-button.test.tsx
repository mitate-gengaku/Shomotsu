import { SignOutButton } from "@/features/auth/components/signout-button";
import { mockSignOut } from "@/tests/setup/mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

describe("SignOutコンポーネントのテスト", () => {
  test("SOBC-001: SignOutButtonコンポーネントのUIが正常に表示されること", () => {
    render(<SignOutButton />)

    const signOutButton = screen.getByRole("button")
    const signOutLogo = screen.getByTestId("signout-icon")

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton.textContent).toBe("サインアウト")
    expect(signOutLogo).toBeInTheDocument();
  })

  test("SOBC-002: ボタンをクリックすると、onSignOut関数を呼び出すこと", async () => {
    const user = userEvent.setup();

    render(<SignOutButton />)

    const signOutButton = screen.getByRole("button")

    await user.click(signOutButton)

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  })
})