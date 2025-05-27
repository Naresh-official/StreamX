import axios from "axios";
import { clientEnv } from "@workspace/config/client";

export async function getAllUsers(
  name?: string,
  page?: number,
  limit?: number
) {
  try {
    const query = new URLSearchParams();
    if (name) query.append("name", name);
    if (page) query.append("page", page.toString());
    if (limit) query.append("limit", limit.toString());

    const response = await axios.get(
      `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/users?${query.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
