import { SignOutButton } from "@/features/auth/components/signout-button";
import { UserDropdown } from "@/features/auth/components/user-dropdown";
import { mockSignOut } from "@/tests/setup/mock";
import * as useClerkUser from "@clerk/nextjs";
import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi, vitest } from "vitest";

describe("UserDropdownコンポーネント", () => {
  let rendered: RenderResult;
  let image: HTMLElement | null = null;
  const orignalGlobalImage = window.Image;

  beforeAll(() => {
    (window.Image as any) = class MockImage {
      onload: () => void = () => {};
      src: string = '';
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
      <UserDropdown />
    );
  });

  afterAll(() => {
    window.Image = orignalGlobalImage;
  });

  test("UDC-001: UserDropdownコンポーネントのUIが正常に表示される", () => {
    const avatar = rendered.getByTestId("avatar")
    const dropdownTrigger = rendered.getByTestId("dropdown-trigger")

    expect(avatar).toBeInTheDocument()
    expect(dropdownTrigger).toBeInTheDocument()
  })

  test('UDC-002: 初期レンダリング時にはimgタグは表示されないこと', () => {
    image = rendered.queryByRole('img');

    expect(image).not.toBeInTheDocument();
  });

  test('UDC-003: ユーザーのusernameが設定されていない場合、Avatar画像のaltテキストは"プロフィール画像"となること', async () => {
    image = await rendered.findByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://placehold.co/100x150")
    expect(image).toHaveAttribute("alt", "プロフィール画像")
  })

  test("UDC-004: ドロップダウンのトリガーボタンをクリックすると、ドロップダウンメニューが表示されること", async () => {
    const user = userEvent.setup();

    const dropdownTrigger = rendered.getByTestId("dropdown-trigger")
    await user.click(dropdownTrigger)

    const dropdownContent = rendered.getByTestId("dropdown-content")
    const accountLink = rendered.getByText("アカウント")
    const settingLink = rendered.getByText("設定")
    const signOutButton = rendered.getByText("サインアウト")
    
    expect(dropdownContent).toBeInTheDocument()
    expect(accountLink).toBeInTheDocument();
    expect(settingLink).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  })
  
  test("SOBC-002: サインアウトボタンをクリックすると、onSignOut関数を呼び出すこと", async () => {
    const user = userEvent.setup();

    const dropdownTrigger = rendered.getByTestId("dropdown-trigger")
    await user.click(dropdownTrigger)

    const signOutButton = rendered.getByText("サインアウト")

    await user.click(signOutButton)

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  })
})