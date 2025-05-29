import axios from "axios";

export async function banUser(email: string) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/ban/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
}
