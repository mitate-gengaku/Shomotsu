import { render, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

import { FormatDate } from "@/components/format/date";

describe("FormatDateコンポーネントのテスト", () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(
      <FormatDate date={new Date(2025, 2, 15, 22, 0).toISOString()} />,
    );
  });

  test("FDC-001: FormatDateコンポーネントのUIが正常に表示されること", () => {
    const formatDate = rendered.getByTestId("format-date");

    expect(formatDate).toBeInTheDocument();
    expect(formatDate.textContent).not.toBeNull();
  });

  test("FDC-002: 変換された日付は特定の形式で表示されている", () => {
    const formatDate = rendered.getByTestId("format-date");

    expect(formatDate.textContent).contain("年");
    expect(formatDate.textContent).contain("月");
    expect(formatDate.textContent).contain("日");
    expect(formatDate.textContent).toEqual("2025年03月16日");
  });
});
