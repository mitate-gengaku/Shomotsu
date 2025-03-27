import { useUser } from "@clerk/nextjs";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "jotai";
import { beforeEach, describe, expect, Mock, test, vitest } from "vitest";
import { ZodError } from "zod";

import { AvatarUploadForm } from "@/features/user/components/avatar-upload-form";
import { avatarSchema } from "@/features/user/schema/avatar-schema";
import { cropperFileAtom } from "@/stores/cropper-file";
import { HydrateAtoms } from "@/tests/setup/mock";

vitest.mock("@clerk/nextjs", () => ({
  useUser: vitest.fn(),
}));

vitest.mock("@/features/user/schema/avatar-schema", () => ({
  avatarSchema: {
    parse: vitest.fn(),
  },
}));

vitest.mock("@/components/ui/avatar", () => ({
  Avatar: ({ children, className }) => (
    <div data-testid="avatar" className={className}>
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt, className }) => (
    <img data-testid="avatar-image" src={src} alt={alt} className={className} />
  ),
  AvatarFallback: ({ children, className }) => (
    <div data-testid="avatar-fallback" className={className}>
      {children}
    </div>
  ),
}));

vitest.mock("lucide-react", () => ({
  UserIcon: () => <div data-testid="user-icon">UserIcon</div>,
}));

describe("AvatarUploadFormコンポーネントのテスト", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("AUFC-001: コンポーネントが正常に表示されること", () => {
    (useUser as Mock).mockReturnValue({
      user: {
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const avatarImage = screen.getByTestId("avatar-image");
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
    expect(avatarImage).toHaveAttribute("alt", "プロフィール画像");

    expect(screen.getByText("アップロード")).toBeInTheDocument();
  });

  test("AUFC-002: ユーザー画像がない場合、フォールバックが表示されること", () => {
    (useUser as Mock).mockReturnValue({
      user: {
        imageUrl: undefined,
      },
    });

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const fallback = screen.getByTestId("avatar-fallback");
    expect(fallback).toBeInTheDocument();

    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  test("AUFC-003: 有効なファイルがアップロードされた場合、cropperFileが設定されること", async () => {
    (useUser as Mock).mockReturnValue({
      user: {
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    (avatarSchema.parse as Mock).mockReturnValue({ avatar: mockFile });

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const fileInput = screen.getByTestId("avatar-file-input");

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(screen.queryByText(/Error/)).not.toBeInTheDocument();
  });

  test("AUFC-004: 無効なファイルがアップロードされた場合、エラーメッセージが表示されること", async () => {
    (useUser as Mock).mockReturnValue({
      user: {
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
    const mockError = new ZodError([
      {
        code: "invalid_type",
        expected: "undefined",
        received: "undefined",
        path: ["avatar"],
        message: "アップロード可能なファイル形式は.jpgまたは.pngのみです",
      },
    ]);
    (avatarSchema.parse as Mock).mockImplementation(() => {
      throw mockError;
    });

    const fileInput = screen.getByTestId("avatar-file-input");

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(
        screen.getByText(
          "アップロード可能なファイル形式は.jpgまたは.pngのみです",
        ),
      ).toBeInTheDocument();
    });
  });

  test("AUFC-005: ファイルが選択されない場合、何も起こらないこと", () => {
    (useUser as Mock).mockReturnValue({
      user: {
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    const mockSetCropperFile = vitest.fn();

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const fileInput = screen.getByTestId("avatar-file-input");

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(mockSetCropperFile).not.toHaveBeenCalled();
    expect(avatarSchema.parse).not.toHaveBeenCalled();
  });

  test("AUFC-006: ユーザーがnullの場合、何も起こらないこと", () => {
    (useUser as Mock).mockReturnValue({
      user: null,
    });

    const mockSetCropperFile = vitest.fn();

    render(<AvatarUploadForm />, {
      wrapper: ({ children }) => {
        return (
          <Provider>
            <HydrateAtoms initialValues={[[cropperFileAtom, undefined]]}>
              {children}
            </HydrateAtoms>
          </Provider>
        );
      },
    });

    const fileInput = screen.getByTestId("avatar-file-input");

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(mockSetCropperFile).not.toHaveBeenCalled();
    expect(avatarSchema.parse).not.toHaveBeenCalled();
  });
});
