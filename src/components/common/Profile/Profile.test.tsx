import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import "@testing-library/jest-dom";

const mockAvatar = "https://example.com/avatar.jpg";
const mockUserName = "testUser";

describe("Profile Component", () => {
  it("renders the avatar image with correct src and alt", () => {
    render(<Profile avatar={mockAvatar} userName={mockUserName} />);
    expect(screen.getByTestId("profile-container")).toBeInTheDocument();
    expect(screen.getByTestId("profile-avatar")).toHaveAttribute(
      "src",
      mockAvatar
    );
  });

  it("renders the user name", () => {
    render(<Profile avatar={mockAvatar} userName={mockUserName} />);
    expect(screen.getByTestId("profile-user-name")).toBeInTheDocument();
  });
});
