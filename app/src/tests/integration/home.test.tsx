import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { beforeEach, describe, expect, test, vi, vitest } from "vitest";

import HomePage from "@/app/_disabled/(main)/home/page";
import { userData } from "@/config/user-data";

vitest.mock("@/config/user-data", () => ({
  userData: {
    name: "田中 太郎",
    avatar: "https://placehold.co/100x150",
    books: [
      {
        id: 1,
        title: "私の冒険",
        progress: 85,
        lastEdited: "2025-03-05",
        cover: "https://placehold.co/100x150",
      },
      {
        id: 2,
        title: "料理の旅",
        progress: 40,
        lastEdited: "2025-03-01",
        cover: "https://placehold.co/100x150",
      },
      {
        id: 3,
        title: "未来の世界",
        progress: 10,
        lastEdited: "2025-02-28",
        cover: "https://placehold.co/100x150",
      },
      {
        id: 4,
        title: "未来の世界",
        progress: 10,
        lastEdited: "2025-02-28",
        cover: "https://placehold.co/100x150",
      },
    ],
  },
}));

vitest.mock("@/features/book/components/content-title-form", () => ({
  ContentTitleForm: vitest.fn(() => <div data-testid="content-title-form" />),
}));

describe("Homeページのテスト", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    mockRouter.push("/");

    vitest.clearAllMocks();
  });

  test.skip("ページが正常に表示される", () => {
    render(<HomePage />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  test.skip("モバイルサイズの画面が表示される", () => {
    render(<HomePage />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    const mobileBookCardContainer = screen.getByTestId(
      "mobile-bookcard-container",
    );
    expect(mobileBookCardContainer).toBeInTheDocument();

    expect(mobileBookCardContainer.children.length).toEqual(2);
  });

  test.skip("デスクトップサイズの画面が表示される", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(min-width: 768px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<HomePage />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    const desktopBookCardContainer = screen.getByTestId(
      "desktop-bookcard-container",
    );
    expect(desktopBookCardContainer).toBeInTheDocument();
    expect(desktopBookCardContainer).toHaveClass("gap-4 justify-between");
  });

  test.skip("bookが3冊のとき、gap-4クラスが適用される", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(min-width: 768px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vitest.mocked(userData).books = [
      {
        id: 1,
        title: "私の冒険",
        progress: 85,
        lastEdited: "2025-03-05",
        cover: "https://placehold.co/100x150",
      },
      {
        id: 2,
        title: "料理の旅",
        progress: 40,
        lastEdited: "2025-03-01",
        cover: "https://placehold.co/100x150",
      },
      {
        id: 3,
        title: "未来の世界",
        progress: 10,
        lastEdited: "2025-02-28",
        cover: "https://placehold.co/100x150",
      },
    ];

    render(<HomePage />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();

    const desktopBookCardContainer = screen.getByTestId(
      "desktop-bookcard-container",
    );
    expect(desktopBookCardContainer).not.toHaveClass("justify-between");

    expect(desktopBookCardContainer.children.length).toEqual(3);
  });
});
