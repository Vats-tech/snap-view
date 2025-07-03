import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryList from "./StoryList";
import users from "../../utils/dummy-data/users.json";
import type { User } from "../../types/user";

const mockUsers = users as User[];

describe("StoryList", () => {
  it("renders a list of user stories", () => {
    // renders template
    render(<StoryList users={mockUsers} onSelect={jest.fn()} />);
    // should render story lists
    expect(screen.getByTestId("story-list")).toBeInTheDocument();
  });

  it("calls onSelect when a story is clicked", () => {
    const onSelect = jest.fn();
    // renders template
    render(<StoryList users={mockUsers} onSelect={onSelect} />);

    // when story thumbnail clicked
    fireEvent.click(
      screen.getByTestId(`story-thumbnail-${mockUsers[0].userId}`)
    );
    // onSelect stub should be called
    expect(onSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("calls onSelect when Enter key is pressed on a story", () => {
    const onSelect = jest.fn();
    // renders template
    render(<StoryList users={mockUsers} onSelect={onSelect} />);
    // when story thumbnail is focused
    const story = screen.getByTestId(`story-thumbnail-${mockUsers[1].userId}`);
    story.focus();
    // on enter
    fireEvent.keyDown(story, { key: "Enter", code: "Enter" });
    // onSelect stub should be called
    expect(onSelect).toHaveBeenCalledWith(mockUsers[1]);
  });

  it("calls onSelect when Space key is pressed on a story", () => {
    const onSelect = jest.fn();
    // renders template
    render(<StoryList users={mockUsers} onSelect={onSelect} />);
    // on story thumbnail focus
    const story = screen.getByTestId(`story-thumbnail-${mockUsers[0].userId}`);
    story.focus();
    fireEvent.keyDown(story, { key: " ", code: "Space" });
    // onSelect stub should be called
    expect(onSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("renders nothing if user list is empty", () => {
    // renders template
    render(<StoryList users={[]} onSelect={jest.fn()} />);
    // stroy should not exist
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
