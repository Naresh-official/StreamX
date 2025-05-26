import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { Video } from "@workspace/types";

export async function getVideoQueue(): Promise<Video[]> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/video-queue`
    );
    return response.data.videos;
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
}
