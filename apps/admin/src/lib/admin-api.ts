// Mock API functions for the admin panel

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

// Videos API
export async function getVideos(params: {
  page: number;
  genre?: string;
  status?: string;
  search?: string;
}): Promise<{ videos: Video[]; totalPages: number; totalCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Generate mock videos
  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
  const allVideos = Array.from({ length: 50 }, (_, i) => ({
    id: `video-${i + 1}`,
    title: `Video Title ${i + 1}`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    uploadedBy: `user${i + 1}@example.com`,
    status: ["completed", "processing", "failed"][
      Math.floor(Math.random() * 3)
    ] as "completed" | "processing" | "failed",
    createdAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
    ).toISOString(),
    featured: Math.random() > 0.7,
  }));

  // Apply filters
  let filteredVideos = allVideos;

  if (params.genre) {
    filteredVideos = filteredVideos.filter(
      (v) => v.genre!.toLowerCase() === params.genre?.toLowerCase()
    );
  }

  if (params.status) {
    filteredVideos = filteredVideos.filter((v) => v.status === params.status);
  }

  if (params.search) {
    filteredVideos = filteredVideos.filter((v) =>
      v.title.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  // Paginate
  const pageSize = 10;
  const totalPages = Math.ceil(filteredVideos.length / pageSize);
  const start = (params.page - 1) * pageSize;
  const videos = filteredVideos.slice(start, start + pageSize);

  return {
    // @ts-ignore
    videos: videos,
    totalPages,
    totalCount: filteredVideos.length,
  };
}

// Users API
export async function getUsers(params: {
  page: number;
  search?: string;
}): Promise<{ users: User[]; totalPages: number; totalCount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Generate mock users
  const allUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    joinDate: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
    ).toISOString(),
    status: Math.random() > 0.9 ? "banned" : "active",
  }));

  // Apply search filter
  let filteredUsers = allUsers;
  if (params.search) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(params.search!.toLowerCase()) ||
        u.email.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  // Paginate
  const pageSize = 15;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const start = (params.page - 1) * pageSize;
  const users = filteredUsers.slice(start, start + pageSize);

  return {
    users,
    totalPages,
    totalCount: filteredUsers.length,
  };
}

// Upload Queue API
export async function getUploadQueue(): Promise<UploadJob[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "upload-001",
      title: "New Action Movie",
      uploadedBy: "director@example.com",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      status: "processing",
    },
    {
      id: "upload-002",
      title: "Comedy Special",
      uploadedBy: "comedian@example.com",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "pending",
    },
    {
      id: "upload-003",
      title: "Documentary Film",
      uploadedBy: "filmmaker@example.com",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "failed",
    },
    {
      id: "upload-004",
      title: "Thriller Series",
      uploadedBy: "producer@example.com",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      status: "completed",
    },
  ];
}
