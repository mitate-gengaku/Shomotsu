import { render, screen } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

import { AppearanceSettingPage } from "@/features/user/pages/appearance-setting";

vitest.mock("@/components/apperance/setting-sidebar", () => ({
  SettingSidebar: () => <div data-testid="mock-setting-sidebar"></div>,
}));
vitest.mock("@/features/user/components/appearance-form", () => ({
  AppearanceForm: () => <div data-testid="mock-appearance-form"></div>,
}));

describe("AppearanceSettingPageコンポーネントのテスト", () => {
  test("ARSPC-001: コンポーネントが正常に表示されること", () => {
    render(<AppearanceSettingPage />);

    const mockSettingSidebar = screen.getByTestId("mock-setting-sidebar");
    const mockAppearanceForm = screen.getByTestId("mock-appearance-form");
    const settingTitle = screen.getByRole("heading", { level: 2 });

    expect(mockSettingSidebar).toBeInTheDocument();
    expect(mockAppearanceForm).toBeInTheDocument();
    expect(settingTitle.textContent).toEqual("外観");
  });
});
