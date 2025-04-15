import { useUser } from "@clerk/nextjs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { useActionState } from "react";
import { expect, test } from "vitest";
import { beforeEach, describe, Mock, vitest } from "vitest";

import { CropperDialog } from "@/features/user/components/cropper-dialog";
import { cropperFileAtom } from "@/stores/cropper-file";
import { HydrateAtoms } from "@/tests/setup/mock";

vitest.mock("@clerk/nextjs", () => ({
  useUser: vitest.fn(),
}));

vitest.mock("react", () => {
  const originalReact = vitest.importActual("react");
  return {
    ...originalReact,
    useActionState: vitest.fn(),
    useRef: vitest.fn(() => ({
      current: {
        cropper: {
          getCroppedCanvas: vitest.fn(() => ({
            toDataURL: vitest.fn(() => "data:image/png;base64,mockedDataUrl"),
          })),
        },
      },
    })),
  };
});

vitest.mock("react-cropper", () => ({
  default: vitest.fn(() => <div data-testid="cropper" />),
}));

vitest.mock("sonner", () => ({
  toast: {
    success: vitest.fn(),
    error: vitest.fn(),
  },
}));

vitest.mock("browser-image-compression", () => ({
  default: vitest.fn().mockResolvedValue(new File([], "compressed-image.png")),
}));

vitest.mock("@/features/user/actions/upload", () => ({
  uploadAvatar: vitest.fn(),
}));

vitest.mock("@/components/loading/spinner", () => ({
  Spinner: ({ className }) => <div data-testid="spinner" className={className} />,
}));

vitest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, disabled, onClick }) => (
    <button data-testid="button" className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}));

vitest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, onOpenChange, children }) => (
    <div data-testid="dialog" data-open={open} onClick={() => onOpenChange && onOpenChange()}>
      {children}
    </div>
  ),
  DialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <div data-testid="dialog-title">{children}</div>,
  DialogDescription: ({ children }) => <div data-testid="dialog-description">{children}</div>,
}));

vitest.mock("@/features/user/utils/convert-data-url-to-file", () => ({
  convertDataUrlToFile: vitest.fn().mockResolvedValue(new File([], "test-file.png")),
}));

global.URL.createObjectURL = vitest.fn(() => "mocked-url");

describe("CropperDialogコンポーネントのテスト", () => {
  beforeEach(() => {
    vitest.clearAllMocks();

    (useUser as Mock).mockReturnValue({
      user: {
        reload: vitest.fn().mockResolvedValue(undefined),
      },
    });

    const mockAction = vitest.fn();
    (useActionState as Mock).mockReturnValue([undefined, mockAction, false]);
  });

  test("CDC-001: コンポーネントは正常に表示される", () => {
    render(<CropperDialog />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>{children}</HydrateAtoms>
          </Provider>
        );
      },
    });

    const dialogTitle = screen.getByText("アバター画像のトリミング");
    const dialogDescription = screen.getByText("枠線に合わせて画像をトリミングしてください");
    const submitButton = screen.getByTestId("button");

    expect(dialogTitle).toBeInTheDocument();
    expect(dialogDescription).toBeInTheDocument();
    expect(submitButton.textContent).toEqual("新しいアバター画像を設定する");
  });

  test("CDC-002: ダイアログが開いている場合、クリックすると閉じること", async () => {
    const user = userEvent.setup();
    const mockFile = new File([], "test.png");

    render(<CropperDialog />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, mockFile]]}>{children}</HydrateAtoms>
          </Provider>
        );
      },
    });

    const dialog = screen.getByTestId("dialog");

    await user.click(dialog);
    expect(dialog).toHaveAttribute("data-open", "false");
  });

  test("CDC-003: 送信中はボタンが無効化され、スピナーが表示されること", () => {
    const mockAction = vitest.fn();

    (useActionState as Mock).mockReturnValue([undefined, mockAction, true]);

    render(<CropperDialog />);

    const button = screen.getByTestId("button");
    expect(button).toBeDisabled();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("新しいアバター画像を設定する")).not.toBeInTheDocument();
  });

  test("CDC-004: 送信中でない場合はボタンテキストが表示されること", () => {
    const mockAction = vitest.fn();

    (useActionState as Mock).mockReturnValue([undefined, mockAction, false]);

    render(<CropperDialog />);

    const button = screen.getByTestId("button");
    expect(button).not.toBeDisabled();

    expect(screen.getByText("新しいアバター画像を設定する")).toBeInTheDocument();
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
});
