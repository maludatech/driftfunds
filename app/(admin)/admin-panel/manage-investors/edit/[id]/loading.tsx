import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen body-container bg-background p-4 pt-24 text-foreground w-full font-rubik">
      {/* AdminSideNavbar */}
      <div className="w-[200px] hidden sm:block">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full max-w-2xl">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

          {/* User Details Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
          </div>

          {/* Deposit Details Section */}
          <div className="mt-6">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-2" />
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-2" />
            </div>
          </div>

          {/* Withdrawal Details Section */}
          <div className="mt-6">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700 mb-2" />
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>
              ))}
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
