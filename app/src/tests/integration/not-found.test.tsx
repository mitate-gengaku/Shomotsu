import NotFound from "@/app/(error)/not-found";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("NotFoundページのテスト", () => {
  test("ページが正常に表示される", () => {
    render(<NotFound />)

    const notFoundPage = screen.getByTestId("notfound-page")

    expect(notFoundPage).toBeInTheDocument();
    expect(screen.getByText(404)).toBeInTheDocument();
    expect(screen.getByText("This page could not be found.")).toBeInTheDocument()
  })
})