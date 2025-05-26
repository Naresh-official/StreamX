"use client";

import { UserManagement } from "@/src/components/UserManagement";
import { useSearchParams } from "next/navigation";
import { useAdminSearchUsers } from "@/src/hooks/useAdminSearchUsers";

function UsersPageClient() {
  const searchParams = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const { users, total, totalPages, loading, error } = useAdminSearchUsers(
    search,
    page,
    10
  );

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage platform users and perform moderation actions
        </p>
      </div>

      <UserManagement
        users={users}
        totalPages={totalPages}
        totalCount={total}
        currentPage={page}
        searchQuery={search}
      />
    </div>
  );
}

export default function UsersPage() {
  return <UsersPageClient />;
}
