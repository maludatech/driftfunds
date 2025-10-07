"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAdminStore } from "@/store/useAdminStore";

interface UserTableProps {
  length: number;
}

const UserTable = ({ length }: UserTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { admin } = useAdminStore();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && admin) {
      fetchUsers();
    }
  }, [admin]);

  // Table columns
  const columns = useMemo(
    () => [
      { header: "Full Name", accessorKey: "fullName" },
      { header: "Email", accessorKey: "email" },
      { header: "Username", accessorKey: "username" },
      { header: "Nationality", accessorKey: "nationality" },
      {
        header: "Registration Date",
        accessorKey: "createdAt",
        cell: (info: any) => formatDate(info.getValue()),
      },
      {
        header: "Referral Code",
        accessorKey: "referralCode",
        cell: (info) => info.getValue() || "null",
      },
    ],
    []
  );

  // Initialize table
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/admin/${timestamp}`, {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users.slice(0, length || data.users.length)); // Fetch only the specified number of users
        setError(null); // Clear any previous error
      } else {
        setError("Error fetching users.");
      }
    } catch (error) {
      setError("Failed to fetch users.");
    }
  };

  // Function to format the registration date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Check if date is invalid

    const options: Intl.DateTimeFormatOptions = {
      month: "long", // Display full month name
      day: "2-digit", // Display day as two digits
      year: "numeric", // Display full year
      hour: "numeric", // Display hour in numeric format
      minute: "2-digit", // Display minute as two digits
      hour12: true, // Use 12-hour format (AM/PM)
    };

    return date.toLocaleDateString("en-US", options) + " ";
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      {error ? (
        <p className="text-red-500 text-center p-4">{error}</p>
      ) : users.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-center p-4 text-lg font-bold w-fit h-fit border-gray-300 rounded-xl">
            No users found‼‼
          </p>
        </div>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200 dark:bg-black">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-400 p-2 sm:p-4 text-left"
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
                <tr key={row.id} className="border border-gray-400 text-center">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-400 p-2 sm:p-4"
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
          {pathname !== "/admin-panel/view-investors" && (
            <div className="flex px-2 pb-2 pt-4 justify-center items-center">
              <button
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 hover:cursor-pointer"
                onClick={() => router.push("/admin-panel/view-investors")}
              >
                View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;
