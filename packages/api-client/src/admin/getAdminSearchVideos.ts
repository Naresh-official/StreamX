import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { GetVideosByCategoryResponse } from "@workspace/types";

export async function getAdminSearchVideos(
  query = "",
  page = 1,
  limit = 10,
  genre?: string,
  status?: string
): Promise<GetVideosByCategoryResponse> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/videos`,
      {
        params: {
          query,
          page,
          limit,
          ...(genre ? { genre } : {}),
          ...(status ? { status } : {}),
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching admin videos:", error);
    throw error;
  }
}
