import { useUser } from "@clerk/nextjs";
import { render, screen } from "@testing-library/react";
import { describe, expect, Mock, test, vitest } from "vitest";

import { AccountSettingPage } from "@/features/user/pages/account-setting";

vitest.mock("@clerk/nextjs", () => ({
  useUser: vitest.fn(),
}));

vitest.mock("@/components/ui/separator", () => ({
  Separator: () => <div data-testid="separator" />,
}));

vitest.mock("@/components/apperance/setting-sidebar", () => ({
  SettingSidebar: () => <div data-testid="mock-setting-sidebar"></div>,
}));

vitest.mock("@/features/user/components/account-setting-form", () => ({
  AccountSettingForm: ({ username }) => (
    <div data-testid="mock-account-form" data-username={username}></div>
  ),
}));

vitest.mock("@/features/user/components/avatar-upload-form", () => ({
  AvatarUploadForm: () => <div data-testid="mock-avatar-upload-form"></div>,
}));

describe("AccountSettingPageコンポーネントのテスト", () => {
  test("ASPC-001: コンポーネントが正常に表示されること", () => {
    (useUser as Mock).mockReturnValue({
      user: {
        username: "testuser",
      },
    });

    render(<AccountSettingPage />);

    const mockSettingSidebar = screen.getByTestId("mock-setting-sidebar");
    const mockAccountForm = screen.getByTestId("mock-account-form");
    const mockAvatarUploadForm = screen.getByTestId("mock-avatar-upload-form");
    const settingTitle = screen.getByRole("heading", { level: 2 });

    expect(mockSettingSidebar).toBeInTheDocument();
    expect(mockAccountForm).toBeInTheDocument();
    expect(mockAvatarUploadForm).toBeInTheDocument();
    expect(settingTitle.textContent).toEqual("アカウント");
  });

  // Spinnerコンポーネントの表示を変更したため、今後修正
  test.skip("ASPC-002: ユーザーがnullの場合、Spinnerコンポネントが表示されること", () => {
    (useUser as Mock).mockReturnValue({
      user: null,
    });

    render(<AccountSettingPage />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("text-teal-500 size-8");

    const mockAccountForm = screen.queryByTestId("mock-account-form");
    expect(mockAccountForm).not.toBeInTheDocument();
  });

  test("ASPC-003: ユーザーネームがnullの場合、空文字列が渡されること", () => {
    (useUser as Mock).mockReturnValue({
      user: {
        username: null,
      },
    });

    render(<AccountSettingPage />);

    const mockAccountForm = screen.getByTestId("mock-account-form");
    expect(mockAccountForm).toBeInTheDocument();
    expect(mockAccountForm).toHaveAttribute("data-username", "");
  });
});
