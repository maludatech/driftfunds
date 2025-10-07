import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background p-4 py-24 text-foreground font-rubik">
      <div className="w-full max-w-md rounded-lg bg-card/80 p-6 shadow-lg backdrop-blur-sm dark:shadow-gray-800">
        {/* Heading and Description */}
        <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 mb-4" />
        <Skeleton className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700 mb-6" />

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* New Password Field */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Submit Button */}
          <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 mt-4" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
