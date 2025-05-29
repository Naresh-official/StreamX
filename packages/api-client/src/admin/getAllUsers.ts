import axios from "axios";

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users?${query.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
