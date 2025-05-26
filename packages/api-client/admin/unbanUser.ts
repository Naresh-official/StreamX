import axios from "axios";
import { clientEnv } from "@workspace/config/client";

export async function unbanUser(email: string) {
  try {
    const response = await axios.patch(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/user/unban/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error unbanning user:", error);
    throw error;
  }
}
