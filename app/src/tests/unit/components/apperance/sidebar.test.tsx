import { act, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import React, { cloneElement, useTransition } from "react";
import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";

import { Sidebar } from "@/components/apperance/sidebar";
import { books } from "@/config/books";

vitest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, onMouseEnter, onMouseLeave, animate, ...props }) => (
      <div
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-animate={animate}
        {...props}
      >
        {children}
      </div>
    ),
    button: ({ children, onClick, onMouseEnter, onMouseLeave, "aria-label": ariaLabel, "data-testid": dataTestId }) => (
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        data-testid={dataTestId}
      >
        {children}
      </button>
    ),
  },
}));

vitest.mock("lucide-react", () => ({
  AlignLeftIcon: () => <div data-testid="align-left-icon">AlignLeftIcon</div>,
  EllipsisIcon: () => <div data-testid="ellipsis-icon">EllipsisIcon</div>,
}));

vitest.mock("use-debounce", () => ({
  useDebouncedCallback: vitest.fn((callback) => callback),
}));

// UIコンポーネントのモック
vitest.mock("@/components/ui/button", () => ({
  Button: ({ children, size, variant, className, onClick, disabled, "data-testid": dataTestId, asChild, ...props }) => {
    if (asChild && children) {
      const cloned = cloneElement(children, {
        ...children.props,
        disabled: disabled,
        "data-testid": dataTestId,
        ...props,
      });
      return cloned;
    }
    return (
      <button
        data-size={size}
        data-variant={variant}
        className={className}
        onClick={onClick}
        disabled={disabled}
        data-testid="button"
        {...props}
      >
        {children}
      </button>
    );
  },
  buttonVariants: vitest.fn(() => "button-variants-class"),
}));

vitest.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, className }) => (
    <div data-testid="scroll-area" className={className}>
      {children}
    </div>
  ),
}));

vitest.mock("@/components/loading/spinner", () => ({
  Spinner: ({ className }) => (
    <div data-testid="spinner" className={className}>
      Loading...
    </div>
  ),
}));

vitest.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }) => (
    <div data-testid="scroll-area" {...props}>
      {children}
    </div>
  ),
}));

vitest.mock(import("react"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTransition: vitest.fn(() => [false, vitest.fn((callback) => callback())]),
  };
});

describe("Sidebarコンポーネントのテスト", () => {
  let renderer: RenderResult;

  beforeEach(() => {
    renderer = render(<Sidebar books={books} />);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("SC-001: コンポーネントが正常に表示されること", () => {
    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const sidebar = renderer.getByTestId("sidebar");

    expect(sidebarTriggerButton).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.getAttribute("data-animate")).toBe("closed");
  });

  test("SC-002: ボタンをクリックすると、サイドバーが開くこと", async () => {
    const user = userEvent.setup();

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const sidebar = renderer.getByTestId("sidebar");

    await act(async () => {
      user.click(sidebarTriggerButton);
    });

    await waitFor(() => {
      expect(sidebar.getAttribute("data-animate")).toBe("open");
    });

    await act(async () => {
      user.click(sidebarTriggerButton);
    });

    await waitFor(() => {
      expect(sidebar.getAttribute("data-animate")).toBe("closed");
    });
  });

  test("SC-003: 開いた状態のサイドバーにカーソルを合わせると、サイドバーは開いた状態を維持すること", async () => {
    const user = userEvent.setup();

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const sidebar = renderer.getByTestId("sidebar");

    await user.hover(sidebarTriggerButton);

    expect(sidebar.getAttribute("data-animate")).toBe("open");

    await user.unhover(sidebarTriggerButton);
    await user.hover(sidebar);

    expect(sidebar.getAttribute("data-animate")).toBe("open");
  });

  test("SC-004: サイドバーからカーソルを外すと、サイドバーが閉じること", async () => {
    const user = userEvent.setup();

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const sidebar = renderer.getByTestId("sidebar");

    await act(async () => {
      user.click(sidebarTriggerButton);
    });

    await waitFor(() => {
      expect(sidebar.getAttribute("data-animate")).toBe("open");
    });

    // userEvent.hover, unhoverではonMouseLeaveイベントが動作しない
    fireEvent.mouseEnter(sidebar);
    fireEvent.mouseLeave(sidebar);

    expect(sidebar.getAttribute("data-animate")).toBe("closed");
  });

  test("SC-005: ⋯ボタンをクリックすると、削除確認ダイアログが開くこと", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const sidebar = renderer.getByTestId("sidebar");
    const alertDialogTrigger = renderer.queryAllByTestId("alert-dialog-trigger")[0];

    await act(async () => {
      user.click(sidebarTriggerButton);
    });

    await waitFor(() => {
      expect(sidebar.getAttribute("data-animate")).toBe("open");
    });

    await user.click(alertDialogTrigger);

    const alertDialogContent = renderer.getAllByTestId("alert-dialog-content")[0];
    const alertDialogTitle = renderer.getAllByText("本の削除")[0];
    const alertDialogBookTitle = renderer.getByText("銀河鉄道の夜", {
      selector: "span",
    });

    expect(alertDialogContent).toBeInTheDocument();
    expect(alertDialogTitle).toBeInTheDocument();
    expect(alertDialogBookTitle).toBeInTheDocument();

    fireEvent.mouseEnter(alertDialogContent);

    await waitFor(() => {
      expect(sidebar.getAttribute("data-animate")).toBe("open");
    });

    await user.click(alertDialogContent);
  });

  test("SC-006: 削除ボタンをクリックすると、削除処理が行われる", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const alertDialogTrigger = renderer.queryAllByTestId("alert-dialog-trigger")[0];

    await user.click(sidebarTriggerButton);
    await user.click(alertDialogTrigger);

    const deleteButton = renderer.queryAllByText("削除")[0];

    fireEvent.click(deleteButton);
  });

  test("SC-007: isPendingがtrueのとき、Spinnerコンポーネントが表示される", async () => {
    vitest.mocked(useTransition).mockReturnValue([true]);
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    const sidebarTriggerButton = renderer.getByTestId("sidebar-trigger");
    const alertDialogTrigger = renderer.queryAllByTestId("alert-dialog-trigger")[0];

    await user.click(sidebarTriggerButton);
    await user.click(alertDialogTrigger);

    const spinner = renderer.queryAllByTestId("spinner")[0];
    const buttonText = renderer.queryByText("削除");

    expect(spinner).toBeInTheDocument();
    expect(buttonText).not.toBeInTheDocument();
  });
});
