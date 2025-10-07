"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useAdminStore } from "@/store/useAdminStore";
import { Spinner } from "@/components/shared/Spinner";
import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import Loading from "./loading";
import { toast } from "sonner";
import { log } from "@/lib/logger";

interface User {
  _id: string;
  fullName: string;
  email: string;
  username: string;
}

const ManageInvestors = ({
  callbackUrl = "/admin/sign-in",
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();
  const { admin } = useAdminStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);

  // Authentication check
  useEffect(() => {
    if (!admin) {
      toast.error("Please sign in as an admin to access this page.");
      router.push(callbackUrl);
    }
    setIsCheckingAuth(false);
  }, [admin, router, callbackUrl]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setIsFetchingUsers(true);
      const response = await fetch(`/api/admin/${Date.now()}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        log.error("Error fetching users:", response.statusText);
        toast.error("Error fetching users.");
      }
    } catch (error) {
      log.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setIsFetchingUsers(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchUsers();
    }
  }, [admin]);

  // Handle edit action
  const handleEdit = (userId: string) => {
    router.push(`manage-investors/edit/${userId}`);
  };

  const handleDelete = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/edit/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success("User deleted successfully.");
      } else {
        log.error("Error deleting user:", response.statusText);
        toast.error("Error deleting user.");
      }
    } catch (error) {
      log.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  // Define table columns
  const columns = useMemo(
    () => [
      { header: "Full Name", accessorKey: "fullName" },
      { header: "Email", accessorKey: "email" },
      { header: "Username", accessorKey: "username" },
      {
        header: "Actions",
        cell: ({ row }: { row: { original: User } }) => (
          <div className="flex gap-2">
            <button
              className="rounded-lg p-2 bg-green-600 border-green-700 font-semibold px-4 border-2 hover:opacity-90 hover:cursor-pointer text-white"
              onClick={() => handleEdit(row.original._id)}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              className="rounded-lg p-2 bg-red-600 border-red-700 font-semibold px-4 border-2 hover:opacity-90 hover:cursor-pointer text-white"
              onClick={() => handleDelete(row.original._id)}
              disabled={isLoading}
            >
              {isLoading ? <Spinner otherStyles="h-5 w-5 mx-auto" /> : "Delete"}
            </button>
          </div>
        ),
      },
    ],
    [isLoading] // Include isLoading as dependency to update button state
  );

  // Initialize table
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show skeleton during auth check, unauthorized access, or user fetching
  if (isCheckingAuth || !admin || isFetchingUsers) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Manage Investors
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Edit or delete investor details as needed.
          </p>

          <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-xl">All Users</h1>
            <button
              onClick={() => {
                router.refresh();
                fetchUsers(); // Re-fetch users on refresh
              }}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
            >
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto p-1 sm:p-0">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-black">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border border-gray-400 p-2 sm:p-3 xl:p-4 text-left"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border border-gray-400 text-center"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-400 p-2 sm:p-3 xl:p-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInvestors;
