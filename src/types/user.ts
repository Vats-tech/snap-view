type StoryType = "image" | "video";

export interface User {
  userId: number;
  userName: string;
  avatar: string;
  stories: Story[];
}

export interface Story {
  id: number;
  type: StoryType;
  src: string;
}
