import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen bg-background body-container p-4 pt-24 text-foreground w-full font-rubik">
      {/* AdminSideNavbar */}
      <div className="w-[200px] hidden sm:block">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-fit">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

          {/* Table Header */}
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* UserTable Placeholder */}
          <div className="flex flex-col gap-2">
            {/* Table Header Row */}
            <div className="grid grid-cols-5 gap-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
              {[...Array(5)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
            {/* Table Rows */}
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 gap-4 p-2 border-b border-gray-200 dark:border-gray-700"
              >
                {[...Array(5)].map((_, colIdx) => (
                  <Skeleton
                    key={colIdx}
                    className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
