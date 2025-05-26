"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Search } from "lucide-react";
import { UserTable } from "./UserTable";
import { User } from "@workspace/types";

interface UserManagementProps {
  users: User[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
  searchQuery: string;
}

export function UserManagement({
  users,
  totalPages,
  totalCount,
  currentPage,
  searchQuery,
}: UserManagementProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", "1");
    router.push(`/users?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({totalCount})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <UserTable
          users={users}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </CardContent>
    </Card>
  );
}
