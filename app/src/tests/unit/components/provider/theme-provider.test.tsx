import { ThemeProvider } from "@/components/provider/theme-provider";
import { themeRender } from "@/tests/setup/mock";
import { render, RenderResult, screen } from "@testing-library/react";
import { useTheme } from "next-themes";
import { beforeEach, describe, expect, test, vitest } from "vitest";

let localStorageMock: { [key: string]: string } = {}

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme();
  return <span data-testid="test-child">{theme}</span>;
};

describe("ThemeProviderコンポーネントのテスト", () => {
  beforeEach(() => {
    global.matchMedia = vitest.fn(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest.fn(),
      removeListener: vitest.fn(),
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn()
    }))
  
    global.Storage.prototype.getItem = vitest.fn(
      (key: string) => localStorageMock[key]
    )
    global.Storage.prototype.setItem = vitest.fn((key: string, value: string) => {
      localStorageMock[key] = value
    })
  
    localStorageMock = {}
  })

  test("TPC-001: コンポーネントが正常に表示されること", () => {
    themeRender(<ThemeProvider><ThemeSpy /></ThemeProvider>, { theme: "light" })

    const testChild = screen.getByTestId("test-child");

    expect(testChild).toBeInTheDocument();
    expect(testChild.textContent).toEqual("light")
  })

  test("TPC-002: darkモードのとき、ThemeProviderにdarkが正しく渡されること", () => {
    themeRender(<ThemeProvider><ThemeSpy /></ThemeProvider>, { theme: "dark" })

    const testChild = screen.getByTestId("test-child");

    expect(testChild).toBeInTheDocument();
    expect(testChild.textContent).toEqual("dark")
  })

  test("TPC-003: systemモードのとき、ThemeProviderにsystemが正しく渡されること", () => {
    themeRender(<ThemeProvider><ThemeSpy /></ThemeProvider>, { theme: "system" })

    const testChild = screen.getByTestId("test-child");

    expect(testChild).toBeInTheDocument();
    expect(testChild.textContent).toEqual("system")
  })
})