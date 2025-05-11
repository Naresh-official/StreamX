export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  createdAt: string;
  views: number;
  status: string;
  categories: { id: string; name: string }[];
}

export interface VideoUrls {
  [key: string]: string;
}

export interface VideoResponse {
  video: Video;
  url: VideoUrls;
}
