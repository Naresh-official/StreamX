import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { GetVideosByCategoryResponse } from "@workspace/types";

export async function searchVideos(
  query = "",
  page = 1,
  limit = 10,
  userId = ""
): Promise<GetVideosByCategoryResponse> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/search`,
      {
        params: {
          query,
          page,
          limit,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
}
