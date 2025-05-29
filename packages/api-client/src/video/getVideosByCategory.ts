import axios from "axios";
import { GetVideosByCategoryResponse } from "@workspace/types";

export async function getVideosByCategory(
  category: string,
  limit = 12,
  page = 1,
  search = "",
  userId = ""
): Promise<GetVideosByCategoryResponse> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/category`,
      {
        params: {
          category,
          limit,
          page,
          ...(search ? { search } : {}),
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    throw error;
  }
}
