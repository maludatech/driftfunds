"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      {/* AdminSideNavbar */}
      <div className="w-[200px] hidden sm:block">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-1 justify-center p-1 w-full">
        {/* Heading and Description */}
        <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 mt-2" />
        <Skeleton className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4" />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* User Management Section */}
        <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mb-6">
          <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
          <Skeleton className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4" />
          <div className="overflow-x-auto p-1 sm:p-0">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead className="bg-gray-200 dark:bg-black">
                <tr>
                  {[...Array(4)].map((_, idx) => (
                    <th
                      key={idx}
                      className="border border-gray-400 p-2 sm:p-3 xl:p-4"
                    >
                      <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border border-gray-400 text-center"
                  >
                    {[...Array(4)].map((_, colIdx) => (
                      <td
                        key={colIdx}
                        className="border border-gray-400 p-2 sm:p-3 xl:p-4"
                      >
                        <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
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

export default Loading;
