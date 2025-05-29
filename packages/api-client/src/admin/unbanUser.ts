import axios from "axios";

export async function unbanUser(email: string) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/unban/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error unbanning user:", error);
    throw error;
  }
}
