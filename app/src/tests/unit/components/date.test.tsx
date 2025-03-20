import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { FormatDate } from "@/components/format/date";

describe("FormatDateコンポーネントのテスト", () => {
  test.skip("コンポーネントは正常に表示される", () => {
    render(<FormatDate date={new Date(2025, 2, 15, 22, 0).toISOString()} />);

    expect(screen.getByText("2025年03月16日")).toBeInTheDocument();
  });
});
