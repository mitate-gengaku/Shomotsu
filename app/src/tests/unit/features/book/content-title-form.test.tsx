import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import React, { useTransition } from "react";
import { describe, expect, test, vi, vitest } from "vitest";
import { beforeEach } from "vitest";

import { ContentTitleForm } from "@/features/book/components/content-title-form";

const mockPush = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vitest.importActual("next/navigation");

  return {
    ...actual,
    useRouter: vitest.fn(() => ({
      push: mockPush,
    })),
  };
});

vitest.mock("react", async () => {
  const actual = await vitest.importActual("react");

  return {
    ...actual,
    useTransition: vi.fn(() => [false, vi.fn((callback) => callback())]),
  };
});

describe("ContentTitleFormコンポーネントのテスト", () => {
  mockRouter.setCurrentUrl("/");

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test.skip("コンポーネントが正常に表示される", () => {
    render(<ContentTitleForm />);

    const contentTitleForm = screen.getByTestId("content-title-form");
    expect(contentTitleForm).toBeInTheDocument();
  });

  test.skip("未入力の状態で送信ボタンをクリックすると、エラー文が表示される", async () => {
    render(<ContentTitleForm />);

    const submitButton = screen.getByTestId("submit-button");

    await userEvent.click(submitButton);

    const errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe("タイトルは必須入力です");
  });

  test.skip("指定の文字数以下の状態で送信ボタンをクリックすると、エラー文が表示される", async () => {
    render(<ContentTitleForm />);

    const inputElement = screen.getByTestId("input");
    await userEvent.type(inputElement, "あああ");

    const submitButton = screen.getByTestId("submit-button");

    await userEvent.click(submitButton);

    const errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe("タイトルは6文字以上必要です");
  });

  test.skip("指定の文字数を超過した状態で送信ボタンをクリックすると、エラー文が表示される", async () => {
    render(<ContentTitleForm />);

    const inputElement = screen.getByTestId("input");
    await userEvent.type(
      inputElement,
      "ああああああああああああああああああああああああああああああああああああ",
    );

    const submitButton = screen.getByTestId("submit-button");

    await userEvent.click(submitButton);

    const errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe("タイトルは32文字以下にしてください");
  });

  test.skip("エラーがない状態で送信ボタンをクリックすると、Spinnerが表示される", async () => {
    render(<ContentTitleForm />);

    const inputElement = screen.getByTestId("input");
    await userEvent.type(inputElement, "銀河鉄道の夜");

    const submitButton = screen.getByTestId("submit-button");

    vitest
      .mocked(useTransition)
      .mockReturnValueOnce([true, vi.fn((callback) => callback())]);
    await userEvent.click(submitButton);

    await waitFor(() => {
      const spinner = screen.queryByTestId("spinner");
      expect(spinner).toBeInTheDocument();
    });
  });
});
