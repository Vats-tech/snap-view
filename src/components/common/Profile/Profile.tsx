import "./Profile.css";

interface ProfileProps {
  avatar: string;
  userName: string;
}

const Profile = ({ avatar, userName }: ProfileProps) => {
  return (
    <div className="profile-container" data-testid="profile-container">
      <div className="profile-circle">
        <img
          data-testid="profile-avatar"
          src={avatar}
          alt={`${userName}'s story thumbnail`}
          className="story-image"
        />
      </div>
      <div className="user-details">
        <div data-testid="profile-user-name" className="user-name">
          {userName}
        </div>
      </div>
    </div>
  );
};

export default Profile;
