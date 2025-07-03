import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import "@testing-library/jest-dom";

describe("ProgressBar", () => {
  it("renders the progress bar container", () => {
    const storyIndex = 0;
    render(
      <ProgressBar
        progress={0.5}
        storyIndex={storyIndex}
        activeStoryIndex={0}
      />
    );
    expect(
      screen.getByTestId(`progress-bar-${storyIndex}`)
    ).toBeInTheDocument();
  });

  it("renders 100% width when index < currentIndex", () => {
    const storyIndex = 0;
    render(<ProgressBar progress={0.3} storyIndex={0} activeStoryIndex={1} />);
    const fill = screen.getByTestId(`progress-fill-${storyIndex}`);
    expect(fill).toHaveStyle({ width: "100%" });
  });

  it("renders 0% width when index > currentIndex", () => {
    const storyIndex = 2;
    render(<ProgressBar progress={0.7} storyIndex={2} activeStoryIndex={1} />);
    const fill = screen.getByTestId(`progress-fill-${storyIndex}`);
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("renders correct width when index === currentIndex", () => {
    const storyIndex = 1;
    render(<ProgressBar progress={0.42} storyIndex={1} activeStoryIndex={1} />);
    const fill = screen.getByTestId(`progress-fill-${storyIndex}`);
    expect(fill).toHaveStyle({ width: "42%" });
  });

  it("renders 0% width when progress is 0 and index === currentIndex", () => {
    const storyIndex = 1;
    render(<ProgressBar progress={0} storyIndex={1} activeStoryIndex={1} />);
    const fill = screen.getByTestId(`progress-fill-${storyIndex}`);
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("renders 100% width when progress is 1 and index === currentIndex", () => {
    const storyIndex = 1;
    render(<ProgressBar progress={1} storyIndex={1} activeStoryIndex={1} />);
    const fill = screen.getByTestId(`progress-fill-${storyIndex}`);
    expect(fill).toHaveStyle({ width: "100%" });
  });
});
