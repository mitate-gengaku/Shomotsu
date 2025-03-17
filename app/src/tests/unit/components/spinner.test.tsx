import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Spinner } from "@/components/loading/spinner";

describe("Spinnerコンポーネントのテスト", () => {
  test("コンポーネントが正常に表示される", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinner.tagName).toBe("svg");
  });
});
