import axios from "axios";

export async function deleteUser(email: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error banning user:", error);
    throw error;
  }
}
