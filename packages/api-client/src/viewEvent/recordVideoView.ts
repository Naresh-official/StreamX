import axios from "axios";

export async function recordVideoView(
  videoId: string,
  userId = ""
): Promise<void> {
  const key = `viewed-${videoId}`;

  if (typeof window === "undefined") return;

  if (sessionStorage.getItem(key)) return;

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/view-event/view`,
      {
        videoId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId || "",
        },
      }
    );

    sessionStorage.setItem(key, "true");
  } catch (error) {
    console.error("Failed to record video view:", error);
    throw error;
  }
}
