import { renderHook } from "@testing-library/react";
import { useAtom, useAtomValue } from "jotai";
import { act } from "react";
import { beforeEach, describe, expect, Mock, test, vitest } from "vitest";

import { useAppearance } from "@/features/user/hooks/use-appearance";
import { useTheme } from "@/hooks/use-theme";

vitest.mock("jotai", () => ({
  useAtom: vitest.fn(),
  useAtomValue: vitest.fn(),
}));

vitest.mock("@/hooks/use-theme", () => ({
  useTheme: vitest.fn(),
}));

describe("useAppearanceフックのテスト", () => {
  const mockOnChangeTheme = vitest.fn();
  const mockSetChecked = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();

    (useAtomValue as Mock).mockReturnValue("light");

    (useTheme as Mock).mockReturnValue({
      onChangeTheme: mockOnChangeTheme,
    });

    (useAtom as Mock).mockReturnValue([false, mockSetChecked]);
  });

  test("UARH-001: useAppearanceフックは正しい初期値を返す", () => {
    const { result } = renderHook(() => useAppearance());

    expect(result.current).toHaveProperty("theme", "light");
    expect(result.current).toHaveProperty("checked", false);
    expect(typeof result.current.onCheckSyncSetting).toBe("function");
    expect(typeof result.current.onCheckCard).toBe("function");
  });

  test("UARH-002: onCheckSyncSettingがcheckedを反転させ、checkedの状態に基づいてテーマを変更すること", () => {
    const { result } = renderHook(() => useAppearance());

    act(() => {
      result.current.onCheckSyncSetting();
    });

    expect(mockSetChecked).toHaveBeenCalled();

    const setCheckedCallback = mockSetChecked.mock.calls[0][0];
    expect(setCheckedCallback(false)).toBe(true);

    expect(mockOnChangeTheme).toHaveBeenCalledWith("system");

    vitest.clearAllMocks();
    (useAtom as Mock).mockReturnValue([true, mockSetChecked]);

    const { result: resultChecked } = renderHook(() => useAppearance());

    act(() => {
      resultChecked.current.onCheckSyncSetting();
    });

    expect(mockOnChangeTheme).toHaveBeenCalledWith("light");
  });

  test("UARH-003: onCheckCardはcheckedがfalseの場合のみテーマを変更すること", () => {
    (useAtom as Mock).mockReturnValue([false, mockSetChecked]);

    const { result: resultUnchecked } = renderHook(() => useAppearance());

    act(() => {
      resultUnchecked.current.onCheckCard("dark");
    });

    expect(mockOnChangeTheme).toHaveBeenCalledWith("dark");

    vitest.clearAllMocks();
    (useAtom as Mock).mockReturnValue([true, mockSetChecked]);

    const { result: resultChecked } = renderHook(() => useAppearance());

    act(() => {
      resultChecked.current.onCheckCard("dark");
    });

    expect(mockOnChangeTheme).not.toHaveBeenCalled();
  });
});
