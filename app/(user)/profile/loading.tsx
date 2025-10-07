import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        {/* SideNavbar Skeleton */}
        <div className="w-[200px] hidden sm:block">
          <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="lg:ml-[176px] xl:ml-[200px] 2xl:ml-[152px] flex flex-col gap-1 justify-center p-1 w-full">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/3 rounded-md mt-2 bg-gray-200 dark:bg-gray-700" />
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* User Info Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-6">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-5 w-5 rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
                <Skeleton className="h-6 w-1/2 rounded-md mt-2 bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>

          {/* Password Update Form */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mb-6">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-col gap-4">
              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
              {/* Confirm Password Input */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
              {/* Submit Button */}
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
