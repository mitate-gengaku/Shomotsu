import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import mockRouter from "next-router-mock";
import { describe, expect, test, vitest } from "vitest";
import { beforeEach } from "vitest";

import { SettingSidebar } from "@/components/apperance/setting-sidebar";

vitest.mock("next/navigation", () => {
  const actual = vitest.importActual("next/navigation");

  return {
    ...actual,
    usePathname: vitest.fn(),
  };
});

describe("SettingSidebarコンポーネントのテスト", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  test("SSC-001: コンポーネントが正常に表示されること", () => {
    vitest.mocked(usePathname).mockReturnValue("/setting");

    render(<SettingSidebar />);

    const sidebarTitle = screen.getByText("設定");
    const sidebarNav = screen.getByRole("navigation");
    const sidebarNavList = screen.getByRole("list");
    const sidebarNavListItems = screen.getAllByRole("listitem");

    expect(sidebarTitle).toBeInTheDocument();
    expect(sidebarNav).toBeInTheDocument();
    expect(sidebarNavList).toBeInTheDocument();

    const expectSidebarNavListItemsText = ["アカウント", "テーマ"];

    sidebarNavListItems.forEach((sidebarNavItem, i) => {
      expect(sidebarNavItem).toBeInTheDocument();
      expect(sidebarNavItem.textContent).toBe(expectSidebarNavListItemsText[i]);
    });
  });

  test("SSC-002: 'アカウント'というラベルを持ったリンクをクリックすると、'/setting/account'に遷移すること", async () => {
    const user = userEvent.setup();

    render(<SettingSidebar />);

    const accountSettingLink = screen.getByRole("link", { name: "アカウント" });
    await user.click(accountSettingLink);

    expect(mockRouter.asPath).toBe("/setting/account");
  });

  test("SSC-003: 'テーマ'というラベルを持ったリンクをクリックすると、'/setting/appearance'に遷移すること", async () => {
    const user = userEvent.setup();

    render(<SettingSidebar />);

    const appearanceSettingLink = screen.getByRole("link", { name: "テーマ" });
    await user.click(appearanceSettingLink);

    expect(mockRouter.asPath).toBe("/setting/appearance");
  });

  test("SSC-004: pathnameがURLと一致するとき、リンクにクラスが付与されること", async () => {
    vitest.mocked(usePathname).mockReturnValue("/setting");
    render(<SettingSidebar />);

    const accountSettingLink = screen.getByRole("link", { name: "アカウント" });

    const accountSettingLinkClassNames = Object.values(
      accountSettingLink.classList,
    );

    expect(accountSettingLinkClassNames).toContain("font-semibold");
    expect(accountSettingLinkClassNames).toContain("text-primary");
    expect(accountSettingLinkClassNames).toContain("bg-slate-300/20");

    vitest.clearAllMocks();
    cleanup();

    vitest.mocked(usePathname).mockReturnValue("/setting/account");
    render(<SettingSidebar />);

    expect(accountSettingLinkClassNames).toContain("font-semibold");
    expect(accountSettingLinkClassNames).toContain("text-primary");
    expect(accountSettingLinkClassNames).toContain("bg-slate-300/20");

    vitest.clearAllMocks();
    cleanup();

    vitest.mocked(usePathname).mockReturnValue("/setting/appearance");
    render(<SettingSidebar />);

    const appearanceSettingLink = screen.getByRole("link", { name: "テーマ" });
    const appearanceSettingLinkClassNames = Object.values(
      appearanceSettingLink.classList,
    );

    expect(appearanceSettingLinkClassNames).toContain("font-semibold");
    expect(appearanceSettingLinkClassNames).toContain("text-primary");
    expect(appearanceSettingLinkClassNames).toContain("bg-slate-300/20");
  });
});
