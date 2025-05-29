import axios from "axios";
import { VideoResponse } from "@workspace/types";

export async function getVideoById(
  videoId: string,
  userId: string = ""
): Promise<VideoResponse> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/${videoId}`,
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
    if (axios.isAxiosError(error)) {
      if (error.status === 403) {
        // Throw a custom error message for inactive user
        throw new Error("USER_NOT_ACTIVE");
      }
    }
    console.error("Error fetching video:", error);
    throw error;
  }
}
