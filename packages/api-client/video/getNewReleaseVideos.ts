import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { Video } from "@workspace/types";

export async function getNewReleaseVideos(email: string): Promise<Video[]> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/new-releases`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching new release videos:", error);
    throw error;
  }
}
