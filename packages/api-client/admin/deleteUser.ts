import axios from "axios";
import { clientEnv } from "@workspace/config/client";

export async function deleteUser(email: string) {
  try {
    const response = await axios.delete(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/user/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
}
