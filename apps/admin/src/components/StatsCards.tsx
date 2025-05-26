import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Users, Video, Upload, Activity } from "lucide-react";
import { DashboardStats } from "../lib/admin-api";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Videos",
      value: stats.totalVideos.toLocaleString(),
      icon: Video,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Videos Uploaded Today",
      value: stats.videosUploadedToday.toString(),
      icon: Upload,
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Active Uploads",
      value: stats.activeUploads.toString(),
      icon: Activity,
      change: "-5%",
      changeType: "negative" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="hover:shadow-lg transition-shadow duration-200 h-56"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent className="mt-5">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span
                className={
                  card.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {card.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
