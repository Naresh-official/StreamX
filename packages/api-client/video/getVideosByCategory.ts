import axios from "axios";
import { clientEnv } from "@workspace/config/client";
import { GetVideosByCategoryResponse } from "@workspace/types";

export async function getVideosByCategory(
  category: string,
  limit = 12,
  page = 1,
  search = ""
): Promise<GetVideosByCategoryResponse> {
  try {
    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/category`,
      {
        params: {
          category,
          limit,
          page,
          ...(search ? { search } : {}), // Only include if non-empty
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    throw error;
  }
}
