"use client";

import AdminSideNavbar from "@/components/shared/AdminSideNavbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <AdminSideNavbar />
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-4 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full max-w-md">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-1/4 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-1/4 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
