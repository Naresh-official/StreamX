import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { GetVideosByCategoryResponse } from "@workspace/types";

export async function searchVideos(
  query = "",
  page = 1,
  limit = 10
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
}
