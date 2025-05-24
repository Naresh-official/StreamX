import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { VideoResponse } from "@workspace/types";

export async function getVideoById(
  videoId: string,
  userEmail: string = ""
): Promise<VideoResponse> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/${videoId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": userEmail,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
}
