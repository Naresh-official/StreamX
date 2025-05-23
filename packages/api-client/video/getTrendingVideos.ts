import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { Video } from "@workspace/types";

export async function getTrendingVideos(email: string): Promise<Video[]> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/trending`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
}
