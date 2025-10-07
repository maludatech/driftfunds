import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex min-h-screen bg-background body-container p-4 pt-24 text-foreground w-full font-rubik">
      {/* AdminSideNavbar */}
      <div className="w-[200px] hidden sm:block">
        <Skeleton className="h-[80vh] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="lg:ml-[200px] 2xl:ml-[150px] flex justify-center items-center w-full">
        <div className="flex flex-col gap-1 rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800 w-full max-w-2xl">
          {/* Heading and Description */}
          <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Subject */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Heading */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Message */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Submit Button */}
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
