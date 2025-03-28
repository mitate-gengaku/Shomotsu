import { useForm } from "@conform-to/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React, { useActionState, useState } from "react";
import { beforeEach, describe, expect, Mock, test, vitest } from "vitest";

import { AccountSettingForm } from "@/features/user/components/account-setting-form";

vitest.mock("@conform-to/react", () => ({
  getFormProps: vitest.fn(() => ({ id: "form-id" })),
  getInputProps: vitest.fn(() => ({ id: "username-id", name: "username" })),
  useForm: vitest.fn(),
}));

vitest.mock("@conform-to/zod", () => ({
  getZodConstraint: vitest.fn(),
  parseWithZod: vitest.fn(),
}));

vitest.mock(import("react"), async (original) => {
  const originalReact = await original();
  return {
    ...originalReact,
    useActionState: vitest.fn(),
    useState: vitest.fn(),
  };
});

vitest.mock("@/features/user/actions/update", () => ({
  updateUserName: vitest.fn(),
}));

vitest.mock("@/components/loading/spinner", () => ({
  Spinner: ({ className }) => (
    <div data-testid="spinner" className={className} />
  ),
}));

vitest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, disabled, type }) => (
    <button
      data-testid="submit-button"
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  ),
}));

vitest.mock("@/components/ui/input", () => ({
  Input: (props) => <input data-testid="username-input" {...props} />,
}));

vitest.mock("@/components/ui/label", () => ({
  Label: ({ children, className }) => (
    <label data-testid="username-label" className={className}>
      {children}
    </label>
  ),
}));

describe("AccountSettingFormコンポーネントのテスト", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("ASFC-001: コンポーネントが正常に表示されること", () => {
    (useState as Mock).mockReturnValue(["testuser", vitest.fn()]);

    (useActionState as Mock).mockReturnValue([undefined, vitest.fn(), false]);

    (useForm as Mock).mockReturnValue([
      { id: "form-id" },
      {
        username: {
          key: "username-key",
          errors: null,
        },
      },
    ]);

    render(<AccountSettingForm username="testuser" />);

    expect(screen.getByTestId("username-label")).toHaveTextContent(
      "ユーザー名",
    );

    const inputElement = screen.getByTestId("username-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("value", "testuser");
    expect(inputElement).not.toBeDisabled();

    const buttonElement = screen.getByTestId("submit-button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("プロフィールを更新");
    expect(buttonElement).not.toBeDisabled();

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  test("ASFC-002: バリデーションエラーが表示されること", () => {
    (useState as Mock).mockReturnValue(["test", vitest.fn()]);
    (useActionState as Mock).mockReturnValue([undefined, vitest.fn(), false]);

    (useForm as Mock).mockReturnValue([
      { id: "form-id" },
      {
        username: {
          key: "username-key",
          errors: "ユーザー名は3文字以上である必要があります",
        },
      },
    ]);

    render(<AccountSettingForm username="test" />);

    const errorText = screen.getByText(
      "ユーザー名は3文字以上である必要があります",
    );
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass("text-red-500");

    const inputElement = screen.getByTestId("username-input");
    expect(inputElement.className).toContain("border-red-500");
    expect(inputElement.className).toContain("bg-red-50");
  });

  test("ASFC-003: 送信中の状態でスピナーが表示され、フィールドが無効化されること", () => {
    (useState as Mock).mockReturnValue(["testuser", vitest.fn()]);

    (useActionState as Mock).mockReturnValue([undefined, vitest.fn(), true]);

    (useForm as Mock).mockReturnValue([
      { id: "form-id" },
      {
        username: {
          key: "username-key",
          errors: null,
        },
      },
    ]);

    render(<AccountSettingForm username="testuser" />);

    const spinner = screen.getByTestId("spinner");
    const userNameInput = screen.getByTestId("username-input");
    const submitButton = screen.getByTestId("submit-button");
    const submitButtonText = screen.queryByText("プロフィールを更新");

    expect(spinner).toBeInTheDocument();
    expect(userNameInput).toBeDisabled();
    expect(submitButton).toBeDisabled();

    expect(submitButtonText).not.toBeInTheDocument();
  });

  test("ASFC-004: inputの入力値を変更できること", () => {
    const mockSetInput = vitest.fn();
    const mockFormUpdate = vitest.fn();

    (useState as Mock).mockReturnValue(["testuser", mockSetInput]);
    (useActionState as Mock).mockReturnValue([undefined, vitest.fn(), false]);

    (useForm as Mock).mockReturnValue([
      {
        id: "form-id",
        update: mockFormUpdate,
      },
      {
        username: {
          key: "username-key",
          errors: null,
        },
      },
    ]);

    render(<AccountSettingForm username="testuser" />);

    const inputElement = screen.getByTestId("username-input");

    fireEvent.change(inputElement, { target: { value: "newusername" } });

    expect(mockSetInput).toHaveBeenCalledWith("newusername");
    expect(mockFormUpdate).toHaveBeenCalledWith({
      name: "username",
      value: "newusername",
    });
  });
});
