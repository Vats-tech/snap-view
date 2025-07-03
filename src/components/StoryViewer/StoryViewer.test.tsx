import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryViewer from "./StoryViewer";
import users from "../../utils/dummy-data/users.json";
import type { User } from "../../types/user";

const mockUser = users[0] as User;

jest.useFakeTimers();

describe("StoryViewer", () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders StoryViewer", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);
    // should render story
    expect(screen.getByTestId("story-viewer")).toBeInTheDocument();
    // should render close button
    expect(screen.getByTestId("story-viewer-close-button")).toBeInTheDocument();
    // should render progress bar
    expect(
      screen.getByTestId("story-viewer-progress-bars")
    ).toBeInTheDocument();
    // should show story content
    expect(screen.getByTestId("story-viewer-content")).toBeInTheDocument();
  });

  it("renders the current story image", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);

    const img = screen.getByTestId("story-viewer-story-image");
    // should render 1st image with correct src
    expect(img).toHaveAttribute("src", mockUser.stories[0].src);
    // should have correct alt text
    expect(img).toHaveAttribute("alt", `${mockUser.userName} story`);
  });

  it("calls onClose when close button is clicked", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);
    // when clicked on close button
    fireEvent.click(screen.getByTestId("story-viewer-close-button"));
    // onClose function should be called
    expect(onClose).toHaveBeenCalled();
  });

  it("shows next story when right side is clicked", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);
    // Simulate image loaded
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    const overlay = screen.getByTestId("story-viewer");
    // Click on right side
    fireEvent.click(overlay, {
      clientX: 500,
      currentTarget: {
        getBoundingClientRect: () => ({ width: 1000, left: 0 }),
      },
    });
    // Simulate image loaded for next story
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // should render next story
    expect(screen.getByTestId("story-viewer-story-image")).toHaveAttribute(
      "src",
      mockUser.stories[1].src
    );
  });

  it("shows previous story when left side is clicked", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);
    // Go to next story first (simulate right side click)
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    fireEvent.click(screen.getByTestId("story-viewer"), {
      clientX: 900,
      currentTarget: {
        getBoundingClientRect: () => ({ width: 1000, left: 0 }),
      },
    });
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // Now click left side to go back
    fireEvent.click(screen.getByTestId("story-viewer"), {
      clientX: -100,
      currentTarget: {
        getBoundingClientRect: () => ({ width: 1000, left: 0 }),
      },
    });
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // should render previous story
    expect(screen.getByTestId("story-viewer-story-image")).toHaveAttribute(
      "src",
      mockUser.stories[0].src
    );
  });

  it("calls onClose when last story finishes", () => {
    // renders template
    render(<StoryViewer user={mockUser} onClose={onClose} />);
    // Simulate image loaded for first story
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // Fast-forward timer to end of first story
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    // Simulate image loaded for second story
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // Fast-forward timer to end of second story
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.load(screen.getByTestId("story-viewer-story-image"));
    // Fast-forward timer to end of third story
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    // onClose stub should be called
    expect(onClose).toHaveBeenCalled();
  });

  it("renders nothing if there are no stories", () => {
    const userNoStories = { ...mockUser, stories: [] };
    const { container } = render(
      <StoryViewer user={userNoStories} onClose={onClose} />
    );
    expect(container.firstChild).toBeNull();
  });
});
