import { CategoryIcons } from "@/features/book/components/category-icons";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";

vitest.mock("@/config/user-data", () => ({
  icons: {
    computer: <svg data-testid="computer"></svg>
  }
}));

describe("CategoryIconsコンポーネントのテスト", () => {
  test("コンポーネントが正常に表示される", () => {
    render(<CategoryIcons icon="computer" />)

    const categoryIcons = screen.getByTestId("category-icons");
    
    expect(categoryIcons).toBeInTheDocument();
  })
})