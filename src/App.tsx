import { useState } from "react";
import { StoryList } from "./components/StoryList";
import StoryViewer from "./components/StoryViewer/StoryViewer";
import type { User } from "./types/user";
import users from "./utils/dummy-data/users.json";
import "./App.css";

const userData: User[] = users as User[];

export default function App() {
  /**
   * State to manage the currently selected user for story viewing.
   */
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  /**
   * Function to handle closing the story viewer.
   * It sets the selected user to null, effectively closing the viewer.
   */
  const onClose = () => {
    setSelectedUser(null);
  };

  /**
   * Function to handle user selection from the story list.
   * It sets the selected user to the user whose stories are being viewed.
   * @param user - The user whose stories are to be viewed.
   */
  const onUserSelect = (user: User): void => {
    setSelectedUser(user);
  };

  /**
   * Render the main application component.
   * It displays the list of user stories and the story viewer if a user is selected.
   */
  return (
    <div className="app">
      <h1 data-testid="app-header" className="app-header">
        SnapView
      </h1>
      <StoryList users={userData} onSelect={onUserSelect} />
      {selectedUser && <StoryViewer onClose={onClose} user={selectedUser} />}
    </div>
  );
}
