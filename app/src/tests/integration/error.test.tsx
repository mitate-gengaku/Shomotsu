import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Error from "@/app/error";

describe("Errorページのテスト", () => {
  test.skip("ページが正常に表示される", () => {
    render(<Error />);

    const errorPage = screen.getByTestId("error-page");

    expect(errorPage).toBeInTheDocument();
    expect(screen.getByText(500)).toBeInTheDocument();
    expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
  });
});
