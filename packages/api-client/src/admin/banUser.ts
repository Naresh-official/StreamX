import axios from "axios";
import { clientEnv } from "@workspace/config/client";

export async function banUser(email: string) {
  try {
    const response = await axios.patch(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/user/ban/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
}
