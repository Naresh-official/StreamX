export interface User {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}
