import { render, screen } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Sidebar } from "@/components/apperance/sidebar";

describe("Sidebarコンポーネントのテスト", () => {
  test.skip("コンポーネントが正常に表示される", () => {
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    expect(sidebar).toBeInTheDocument();
    expect(sidebarTrigger).toBeInTheDocument();
  });

  test.skip("ボタンをクリックすると、サイドバーが画面上に表示される", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    await user.click(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(sidebar).toHaveStyle("transform: none");
  });

  test.skip("ボタンにカーソルを合わせると、サイドバーが画面上に表示される", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    await user.hover(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: none");
  });

  test.skip("ボタンからカーソルを外すと、サイドバーが閉じる", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    await user.hover(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: none");

    await user.unhover(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: translateX(-100%)");
  });

  test.skip("開いているサイドバーにカーソルを合わせるとその状態を維持し、カーソルを外すとサイドバーが閉じる", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    await user.hover(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: none");

    await user.hover(sidebar);

    await user.unhover(sidebar);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: translateX(-100%)");
  });

  test.skip("開いているサイドバーメニューの・・・ボタンにカーソルを合わせるとその状態を維持する", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");
    const alertDialogTrigger = screen.getAllByTestId("alert-dialog-trigger");

    await user.hover(sidebarTrigger);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: none");

    await user.click(alertDialogTrigger[0]);

    const alertDialogContent = screen.getAllByTestId("alert-dialog-content");

    await user.hover(alertDialogContent[0]);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(sidebar).toHaveStyle("transform: none");
  });
});
