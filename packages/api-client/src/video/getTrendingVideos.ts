import axios from "axios";
import { Video } from "@workspace/types";

export async function getTrendingVideos(userId: string): Promise<Video[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/trending`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
}
