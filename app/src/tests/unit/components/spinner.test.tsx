import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Spinner } from "@/components/loading/spinner";

describe("Spinnerコンポーネントのテスト", () => {
  test("SC-001: コンポーネントが正常に表示されること", () => {
    render(<Spinner className="text-teal-500" />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinner.tagName).toBe("svg");
    expect(spinner.classList).toContain("text-teal-500")
  });
});
