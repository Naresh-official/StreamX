import { useState, useEffect } from "react";
import { getAllUsers } from "@workspace/api-client";
import { User } from "@workspace/types";

interface UseAdminSearchUsersResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export function useAdminSearchUsers(
  name: string = "",
  page: number = 1,
  limit: number = 10
): UseAdminSearchUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllUsers(name, page, limit);
        setUsers(response.users || []);
        setTotal(response.total || 0);
        setTotalPages(response.totalPages || 0);
      } catch (err) {
        setError("Failed to fetch admin users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [name, page, limit]);

  return {
    users,
    total,
    page,
    limit,
    totalPages,
    loading,
    error,
  };
}
