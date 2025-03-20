import { readFileSync } from "fs";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent, {
  PointerEventsCheckLevel,
} from "@testing-library/user-event";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { beforeEach, describe, expect, Mock, test, vitest } from "vitest";

import { create } from "@/features/book/actions/create";
import { NewBookForm } from "@/features/book/components/new-book-form";

vitest.mock("jotai", async () => {
  const actual = await vitest.importActual("jotai");

  return {
    ...actual,
    useAtomValue: vitest.fn(),
    useSetAtom: vitest.fn().mockReturnValue(vitest.fn()),
  };
});

vitest.mock("next/navigation", () => ({
  useRouter: vitest.fn(),
}));

vitest.mock("react", async () => {
  const actual = await vitest.importActual("react");

  return {
    ...actual,
    useActionState: vitest.fn(),
    useState: vitest
      .fn()
      .mockImplementation((initialValue) => [initialValue, vitest.fn()]),
    useEffect: vitest.fn(),
  };
});

vitest.mock("@/features/book/actions/create", () => ({
  create: vitest.fn(),
}));

const mockActionState = (result: any = undefined, isPending = false) => {
  (useActionState as Mock).mockReturnValue([result, create, isPending]);
};

describe("NewBookForm", () => {
  beforeEach(() => {
    vitest.clearAllMocks();

    (useAtomValue as Mock).mockReturnValue("");
    (useRouter as Mock).mockReturnValue({
      back: vitest.fn(),
    });
    mockActionState();
  });

  test("コンポーネントが正しく表示される", () => {
    render(<NewBookForm />);

    expect(screen.getByText("コンテンツを作成する")).toBeInTheDocument();
    expect(screen.getByText("タイトル")).toBeInTheDocument();
    expect(screen.getByText("カテゴリ")).toBeInTheDocument();
    expect(screen.getByText("表紙")).toBeInTheDocument();
    expect(screen.getByText("コンテンツ")).toBeInTheDocument();
    expect(screen.getByText("公開")).toBeInTheDocument();

    expect(screen.getByText("キャンセル")).toBeInTheDocument();
    expect(screen.getByText("コンテンツを作成")).toBeInTheDocument();
  });

  test("titleAtomに値があるときはタイトルが表示される", () => {
    const mockTitle = "銀河鉄道の夜";
    (useAtomValue as Mock).mockReturnValue(mockTitle);

    render(<NewBookForm />);

    expect(screen.getByText("タイトル")).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("銀河鉄道の夜"),
    ).not.toBeInTheDocument();
  });

  test("フォーム入力が正しく機能する", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    render(<NewBookForm />);

    const titleInput = screen.getByPlaceholderText("銀河鉄道の夜");
    await user.type(titleInput, "テストタイトル");
    expect(titleInput).toHaveValue("テストタイトル");

    const categorySelect = screen.getByText("カテゴリを選択してください");
    await user.click(categorySelect);

    const contentTextarea =
      screen.getByPlaceholderText("本の内容を入力してください");
    await user.type(contentTextarea, "テストコンテンツ");
    expect(contentTextarea).toHaveValue("テストコンテンツ");

    const publishSwitch = screen.getByRole("switch");
    await user.click(publishSwitch);
    expect(publishSwitch).toBeChecked();
  });

  test("ファイルアップロードが正しく機能する", () => {
    render(<NewBookForm />);

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByText("表紙");

    fireEvent.change(fileInput, { target: { files: [file] } });
  });

  test("キャンセルボタンをクリックするとrouter.backが呼ばれる", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    const mockBack = vitest.fn();
    (useRouter as Mock).mockReturnValue({
      back: mockBack,
    });

    render(<NewBookForm />);

    const cancelButton = screen.getByText("キャンセル");
    await user.click(cancelButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  test("送信中は入力フィールドとボタンが無効化される", () => {
    mockActionState(undefined, true);

    render(<NewBookForm />);

    expect(screen.getByPlaceholderText("銀河鉄道の夜")).toBeDisabled();
    expect(
      screen.getByText("カテゴリを選択してください").closest("button"),
    ).toBeDisabled();
    expect(
      screen.getByPlaceholderText("本の内容を入力してください"),
    ).toBeDisabled();

    expect(screen.getByText("キャンセル")).toBeDisabled();

    const submitButton = screen.getByRole("button", { name: "読み込み中" });
    expect(submitButton).toBeDisabled();
    expect(submitButton.querySelector(".text-white")).toBeInTheDocument();
  });

  test("フォーム送信時にactionとsetConfettiが呼ばれる", async () => {
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    const mockSetConfetti = vitest.fn();
    (useSetAtom as Mock).mockReturnValue(mockSetConfetti);

    render(<NewBookForm />);

    await user.type(
      screen.getByPlaceholderText("銀河鉄道の夜"),
      "テストタイトル",
    );

    const submitButton = screen.getByText("コンテンツを作成");
    await user.click(submitButton);
  });

  test("バリデーションエラーが表示される", async () => {
    mockActionState({
      status: "error",
      errors: {
        title: {
          type: "path",
          path: ["title"],
          message: "タイトルは必須入力です",
        },
        category: {
          type: "path",
          path: ["category"],
          message: "カテゴリは必須です",
        },
        content: {
          type: "path",
          path: ["content"],
          message: "コンテンツは必須です",
        },
      },
    });
    render(<NewBookForm />);

    const submitButton = screen.getByRole("button", {
      name: "コンテンツを作成",
    });
    await userEvent.click(submitButton);

    expect(screen.getByText("タイトルは必須入力です")).toBeInTheDocument();
    expect(screen.getByText("無効な選択です")).toBeInTheDocument();
    expect(
      screen.getByText("表紙の画像は必ず選んでください"),
    ).toBeInTheDocument();
    expect(screen.getByText("コンテンツは必須入力です")).toBeInTheDocument();
  });
});
