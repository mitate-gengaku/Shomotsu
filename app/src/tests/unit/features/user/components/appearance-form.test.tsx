import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, Mock, test, vitest } from "vitest";

import { AppearanceForm } from "@/features/user/components/appearance-form";
import { useAppearance } from "@/features/user/hooks/use-appearance";

vitest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>,
}));

vitest.mock("@/components/ui/switch", () => ({
  Switch: ({ props, onCheckedChange }) => <div data-testid="switch" onClick={onCheckedChange} {...props} />,
}));

vitest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

vitest.mock("@/features/user/hooks/use-appearance", () => ({
  useAppearance: vitest.fn(),
}));

vitest.mock("@/confing/theme", () => ({
  themeOptions: [
    {
      id: "light",
      title: "ライト",
      icon: <span>light</span>,
      description: "明るい外観",
    },
    {
      id: "dark",
      title: "ダーク",
      icon: <span>dark</span>,
      description: "暗い外観",
    },
  ],
}));

describe("ApperaranceFormコンポーネントのテスト", () => {
  test("ARFC-001: コンポーネントが正常に表示される", () => {
    vitest.mocked(useAppearance).mockReturnValue({
      theme: "light",
      checked: false,
      onCheckSyncSetting: () => {},
      onCheckCard: () => {},
    });
    render(<AppearanceForm />);

    const syncLabelText = screen.getByText("テーマをシステムと同期");
    const themeLabelText = screen.getByText("テーマ");
    const themeCards = screen.getAllByTestId("theme-card");
    const cardTitles = screen.getAllByTestId("card-title");
    const cardDescriptions = screen.getAllByTestId("card-description");

    expect(syncLabelText).toBeInTheDocument();
    expect(themeLabelText).toBeInTheDocument();

    themeCards.forEach((themeCard) => {
      expect(themeCard).toBeInTheDocument();
    });

    const expectTitleResult = ["ライト", "ダーク"];
    cardTitles.forEach((cardTitle, i) => {
      expect(cardTitle).toBeInTheDocument();
      expect(cardTitle.textContent).toEqual(expectTitleResult[i]);
    });

    const expectDescriptionResult = ["明るい外観", "暗い外観"];
    cardDescriptions.forEach((cardDescription, i) => {
      expect(cardDescription).toBeInTheDocument();
      expect(cardDescription.textContent).toEqual(expectDescriptionResult[i]);
    });
  });

  test("ARFC-002: システム同期がオフの場合、テーマカードが有効になっていること", () => {
    (useAppearance as Mock).mockReturnValue({
      theme: "light",
      checked: false,
      onCheckSyncSetting: vitest.fn(),
      onCheckCard: vitest.fn(),
    });

    render(<AppearanceForm />);

    const themeCards = screen.getAllByTestId("theme-card");
    themeCards.forEach((card) => {
      expect(card).not.toBeDisabled();
    });
  });

  test("ARFC-003: システム同期スイッチをクリックするとonCheckSyncSettingが呼ばれること", () => {
    const mockOnCheckSyncSetting = vitest.fn();
    (useAppearance as Mock).mockReturnValue({
      theme: "light",
      checked: false,
      onCheckSyncSetting: mockOnCheckSyncSetting,
      onCheckCard: vitest.fn(),
    });

    render(<AppearanceForm />);

    const mockSwitch = screen.getByTestId("switch");
    fireEvent.click(mockSwitch);

    expect(mockOnCheckSyncSetting).toHaveBeenCalledTimes(1);

    fireEvent.click(mockSwitch);

    expect(mockOnCheckSyncSetting).toHaveBeenCalledTimes(2);
  });

  test("テーマカードをクリックするとonCheckCardが正しい引数で呼ばれること", () => {
    const mockOnCheckCard = vitest.fn();
    (useAppearance as Mock).mockReturnValue({
      theme: "light",
      checked: false,
      onCheckSyncSetting: vitest.fn(),
      onCheckCard: mockOnCheckCard,
    });

    render(<AppearanceForm />);

    const themeCards = screen.getAllByTestId("theme-card");

    fireEvent.click(themeCards[0]);
    expect(mockOnCheckCard).toHaveBeenCalledWith("light");

    fireEvent.click(themeCards[1]);
    expect(mockOnCheckCard).toHaveBeenCalledWith("dark");

    expect(mockOnCheckCard).toHaveBeenCalledTimes(2);
  });
});
