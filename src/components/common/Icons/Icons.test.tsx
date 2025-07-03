import { render, screen } from "@testing-library/react";
import Icons from "./Icons";
import "@testing-library/jest-dom";

describe("Icons Component", () => {
  it("renders the icon with correct attributes", () => {
    render(<Icons id="close" iconSize="medium" classes="test-class" />);
    const icon = screen.getByTestId("lsm-icon-close");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("test-class");
    expect(icon).toHaveAttribute("width", "20");
    expect(icon).toHaveAttribute("height", "20");
  });
});
