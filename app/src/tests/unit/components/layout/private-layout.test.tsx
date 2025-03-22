import { render, RenderResult, screen } from "@testing-library/react";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import PrivateLayout from "@/app/(private)/layout";
import userEvent from "@testing-library/user-event";

describe("PrivateLayoutコンポーネントのテスト", () => {
  let rendered: RenderResult;
  const image: HTMLElement | null = null;
  const orignalGlobalImage = window.Image;

  beforeAll(() => {
    (window.Image as any) = class MockImage {
      onload: () => void = () => {};
      src: string = "";
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 300);
        return this;
      }
    };
  });

  beforeEach(() => {
    rendered = render(
      <PrivateLayout>
        <h2>Good Morning</h2>
      </PrivateLayout>,
    );
  });

  afterAll(() => {
    window.Image = orignalGlobalImage;
  });

  test("PL-001: PrivateLayoutコンポーネントのUIが正常に表示される", () => {
    // Header
    const header = rendered.getByTestId("auth-header");
    const logo = rendered.getByText("Shomotsu").closest("a");

    // dropdown
    const avatar = rendered.getByTestId("avatar");
    const dropdownTrigger = rendered.getByTestId("dropdown-trigger");

    // sidebar
    const sidebar = screen.getByTestId("sidebar");
    const sidebarTrigger = screen.getByTestId("sidebar-trigger");

    // main
    const mainSection = screen.getByTestId("main");
    const mainChildren = screen.getByText("Good Morning");

    const navMenu = screen.getByRole("navigation");
    const homeIcon = navMenu.querySelector("svg.lucide.lucide-house");

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();

    expect(avatar).toBeInTheDocument();
    expect(dropdownTrigger).toBeInTheDocument();

    expect(sidebar).toBeInTheDocument();
    expect(sidebarTrigger).toBeInTheDocument();

    expect(mainSection).toBeInTheDocument();
    expect(mainChildren).toBeInTheDocument();

    expect(navMenu).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
  });

  test("PL-002: ドロップダウンのトリガーボタンをクリックすると、ドロップダウンメニューが表示されること", async () => {
    const user = userEvent.setup();

    const dropdownTrigger = rendered.getByTestId("dropdown-trigger");
    await user.click(dropdownTrigger);

    const dropdownContent = rendered.getByTestId("dropdown-content");
    const accountLink = rendered.getByText("アカウント");
    const settingLink = rendered.getByText("設定");
    const signOutButton = rendered.getByText("サインアウト");

    expect(dropdownContent).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
    expect(settingLink).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });
});
