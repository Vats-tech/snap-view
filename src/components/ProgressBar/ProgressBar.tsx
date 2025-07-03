import "./ProgressBar.css";

type ProgressBarProps = {
  progress: number;
  storyIndex: number;
  activeStoryIndex: number;
};

/**
 * ProgressBar component displays the progress of a story in a story viewer.
 * It shows a filled bar based on the current story's progress.
 * It adjusts the width of the fill based on whether the story is completed, in progress, or not yet started.
 * @param storyIndex - The index of the current story
 * @param activeStoryIndex - The index of the story currently being viewed
 * @param progress - The progress of the current story as a number between 0 and 1
 * @returns
 */
export default function ProgressBar({
  storyIndex,
  activeStoryIndex,
  progress,
}: ProgressBarProps) {
  return (
    <div data-testid={`progress-bar-${storyIndex}`} className="progress-bar">
      <div
        data-testid={`progress-fill-${storyIndex}`}
        className="progress-fill"
        style={{
          width:
            storyIndex < activeStoryIndex
              ? "100%"
              : storyIndex > activeStoryIndex
              ? "0%"
              : `${progress * 100}%`,
        }}
      />
    </div>
  );
}
