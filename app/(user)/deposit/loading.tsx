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
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-4 p-1 w-full">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* Investment Plans and Form */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
            {/* Plan Selection Title */}
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
            {/* Plan Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600"
                >
                  <Skeleton className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto mb-2" />
                  <Skeleton className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto mb-2" />
                  <div className="space-y-1 text-center">
                    <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto" />
                    <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700 mx-auto" />
                  </div>
                </div>
              ))}
            </div>

            {/* Coin Selection */}
            <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
            <div className="rounded-lg bg-card/80 p-4 shadow-md border border-gray-300 dark:border-gray-600">
              {[1, 2].map((_, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-5 w-1/3 ml-2 rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
            </div>

            {/* Amount Input and Button */}
            <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
