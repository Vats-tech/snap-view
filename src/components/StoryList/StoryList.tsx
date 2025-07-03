import type { User } from "../../types/user";
import "./StoryList.css";

type Props = {
  users: User[];
  onSelect: (args0: User) => void;
};

export default function StoryList({ users, onSelect }: Props) {
  return (
    <div data-testid="story-list" className="story-list">
      {users.map((user) => (
        <div
          data-testid={`story-thumbnail-${user.userId}`}
          key={user.userId}
          className="story-thumbnail"
          onClick={() => onSelect(user)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(user);
            }
          }}
          aria-label={`View ${user.userName}'s story`}
        >
          <img
            data-testid="story-image"
            src={user.avatar}
            alt={`${user.userName}'s story thumbnail`}
            className="story-image"
          />
        </div>
      ))}
    </div>
  );
}
