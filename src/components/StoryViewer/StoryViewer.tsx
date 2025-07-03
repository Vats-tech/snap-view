import { useEffect, useState, useRef } from "react";
import type { User } from "../../types/user";
import Icons from "../common/Icons/Icons";
import { ProgressBar } from "../ProgressBar";
import { Profile } from "../common/Profile";
import "./StoryViewer.css";

interface StroyViewerProps {
  user: User;
  onClose: () => void;
}

const STORY_DURATION = 3000; // Duration for each story in milliseconds

const StoryViewer = ({ user, onClose }: StroyViewerProps) => {
  /**
   * State to manage the current index of the story being viewed.
   */
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * State to track if the image has been loaded.
   * This is used to ensure that the progress bar only updates when the image is fully loaded
   */
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  /**
   * State to manage the progress of the current story.
   * This is a number between 0 and 1 representing the completion percentage of the current
   */
  const [progress, setProgress] = useState<number>(0);

  /**
   * Ref to store the interval ID for the story timer.
   * This is used to clear the interval when the component unmounts or when the story
   */
  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Effect to reset the imageLoaded state when the currentIndex changes.
   * This ensures that the image is reloaded when switching to a new story.
   */
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  /**
   * Effect to handle the story progress and switching between stories.
   * It sets up an interval that updates the progress based on the elapsed time.
   */
  useEffect(() => {
    if (imageLoaded) {
      // Clear any existing interval before starting a new one
      if (timeRef.current !== null) {
        clearInterval(timeRef.current);
      }
      setProgress(0);
      const start = Date.now();
      timeRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        setProgress(Math.min(elapsed / STORY_DURATION, 1));
        if (elapsed >= STORY_DURATION) {
          if (timeRef.current !== null) {
            clearInterval(timeRef.current);
          }
          if (currentIndex < user.stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            onClose();
          }
        }
      }, 50);
    }
    return () => {
      if (timeRef.current !== null) {
        clearInterval(timeRef.current);
      }
    };
  }, [currentIndex, imageLoaded, onClose, user.stories.length]);

  /**
   * Handles click events on the story viewer overlay.
   * If the click is on the left side, it goes to the previous story.
   * If the click is on the right side, it goes to the next story.
   *
   * @param e React.MouseEvent<HTMLDivElement>
   *
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { width, left } = currentTarget.getBoundingClientRect();
    const clickX = clientX - left;

    if (clickX < width / 2) {
      // Clicked on left side
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    } else {
      // Clicked on right side
      setCurrentIndex((prev) => Math.min(prev + 1, user.stories.length - 1));
    }
  };

  // If there are no stories, return null to avoid rendering
  if (!user.stories[currentIndex]) return null;

  return (
    <div
      data-testid="story-viewer"
      className="story-viewer-overlay"
      role="button"
      tabIndex={0}
      aria-label="Tap left or right to view previous or next story"
      onClick={handleClick}
    >
      <button
        data-testid="story-viewer-close-button"
        aria-label="Close story viewer"
        className="story-viewer__close-button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Icons id="close" classes="" iconSize="xlarge" />
      </button>
      <Profile userName={user.userName} avatar={user.avatar} />
      <div
        data-testid="story-viewer-progress-bars"
        className="story-viewer__progress-bars"
      >
        {user.stories.map((_, idx) => (
          <ProgressBar
            key={idx}
            storyIndex={idx}
            activeStoryIndex={currentIndex}
            progress={progress}
          />
        ))}
      </div>
      <div
        data-testid="story-viewer-content"
        className="story-viewer__stroy-content"
      >
        {user.stories[currentIndex].type === "image" && (
          <img
            data-testid="story-viewer-story-image"
            key={user.stories[currentIndex].src}
            src={user.stories[currentIndex].src}
            alt={`${user.userName} story`}
            onLoad={() => setImageLoaded(true)}
            ref={(img) => {
              if (img && img.complete) {
                setImageLoaded(true); // Manually trigger if cached
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
