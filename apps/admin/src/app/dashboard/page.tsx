import { getDashboardStats, getRecentActivity } from "@/src/lib/admin-api";
import { StatsCards } from "@/src/components/StatsCards";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();
  console.log("Recent Activity:", recentActivity);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of platform activity and system status
        </p>
      </div>

      <StatsCards stats={stats} />
    </div>
  );
}
