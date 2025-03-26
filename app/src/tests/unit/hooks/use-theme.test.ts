import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

import { useTheme } from "@/hooks/use-theme";

const mockSetTheme = vitest.fn();
vitest.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
  }),
}));

describe("useThemeのテスト", () => {
  test("UTH-001: useThemeフックは正しい初期値を返すこと", async () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current).toHaveProperty("onChangeTheme");
    expect(typeof result.current.onChangeTheme).toBe("function");
  });

  test("UTH-002: onChangeThemeを呼び出すとき、正しい値がsetThemeに渡されること", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.onChangeTheme("light");
    });

    expect(mockSetTheme).toHaveBeenLastCalledWith("light");

    act(() => {
      result.current.onChangeTheme("system");
    });

    expect(mockSetTheme).toHaveBeenLastCalledWith("system");
  });
});
