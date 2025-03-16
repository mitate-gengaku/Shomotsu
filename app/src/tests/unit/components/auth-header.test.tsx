import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vitest } from "vitest";

import { AuthHeader } from "@/components/layout/auth-header";

vitest.mock("@/components/layout/sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("AuthHeaderコンポーネントのテスト", () => {
  test("コンポーネントが正常に表示される", () => {
    render(<AuthHeader />);

    const authHeader = screen.getByTestId("auth-header");
    const sidebar = screen.getByTestId("sidebar");

    expect(authHeader).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
  });

  test("ドロップダウンメニューが表示される", async () => {
    const user = userEvent.setup();

    render(<AuthHeader />);

    const dropdownMenuTrigger = screen.getByTestId("dropdown-trigger");

    await user.click(dropdownMenuTrigger);

    const dropdownMenu = screen.getByRole("menu");

    expect(dropdownMenu).toBeInTheDocument();

    const dropdownMenuItems = screen.getAllByRole("menuitem");

    dropdownMenuItems.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
