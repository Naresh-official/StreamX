import axios from "axios";

export async function deleteVideo(id: string): Promise<{ message: string }> {
  if (!id) {
    throw new Error("Video ID is required");
  }
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/video`,
      {
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting admin video:", error);
    throw error;
  }
}
