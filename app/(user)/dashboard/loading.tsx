import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const Loading = () => {
  return (
    <div className="flex min-h-screen bg-background p-4 pt-24 text-foreground w-full font-rubik">
      <div className="body-container flex flex-col sm:flex-row gap-2 w-full">
        {/* SideNavbar */}
        <div className="w-[200px] hidden sm:block">
          <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="lg:ml-[200px] 2xl:ml-[150px] flex flex-col gap-1 justify-center p-1 w-full">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 py-6">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className="rounded-lg bg-card/80 p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
                  {idx === 0 && (
                    <Skeleton className="h-3 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700 mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Referral Link Section */}
          <div className="rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 mb-6">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex gap-2 items-center flex-col sm:flex-row">
              <div className="flex flex-col gap-2 sm:flex-row flex-nowrap sm:items-center w-full">
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-[100px] w-[100px] rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Deposit Information */}
          <div className="flex flex-col rounded-lg bg-card/80 shadow-lg backdrop-blur-sm dark:shadow-gray-800 py-2 gap-4">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 px-6" />
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between p-2 bg-black dark:bg-white w-full px-4">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>
              {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
                <div key={idx} className="flex justify-between p-2 w-full">
                  <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
              <div className="px-4 pb-4">
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
