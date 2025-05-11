import axios from "axios";
import { clientEnv } from "@workspace/config/client";

interface Video {
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

interface VideoUrls {
  [key: string]: string;
}

interface VideoResponse {
  video: Video;
  url: VideoUrls;
}

export async function getVideoById(videoId: string): Promise<VideoResponse> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/${videoId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
}
