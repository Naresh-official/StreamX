export interface DashboardStats {
  totalUsers: number;
  totalVideos: number;
  videosUploadedToday: number;
  activeUploads: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  uploadedBy: string;
  genre: string;
  uploadDate: string;
  status: "completed" | "processing" | "failed";
}

export interface Video {
  id: string;
  title: string;
  genre: string;
  uploadedBy: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  featured: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "banned";
}

export interface UploadJob {
  id: string;
  title: string;
  uploadedBy: string;
  createdAt: string;
  status: "pending" | "processing" | "completed" | "failed";
}

// Dashboard API
export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalUsers: 12543,
    totalVideos: 8921,
    videosUploadedToday: 47,
    activeUploads: 12,
  };
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return [
    {
      id: "1",
      title: "The Last Frontier",
      uploadedBy: "john@example.com",
      genre: "Action",
      uploadDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "completed",
    },
    {
      id: "2",
      title: "Midnight Comedy",
      uploadedBy: "sarah@example.com",
      genre: "Comedy",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      status: "processing",
    },
    {
      id: "3",
      title: "Space Odyssey",
      uploadedBy: "mike@example.com",
      genre: "Sci-Fi",
      uploadDate: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      status: "failed",
    },
    {
      id: "4",
      title: "Horror Night",
      uploadedBy: "emma@example.com",
      genre: "Horror",
      uploadDate: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      status: "completed",
    },
    {
      id: "5",
      title: "Drama Queen",
      uploadedBy: "alex@example.com",
      genre: "Drama",
      uploadDate: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      status: "completed",
    },
  ];
}
